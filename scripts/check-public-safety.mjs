#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import process from "node:process";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ZERO_OBJECT = /^0{40,64}$/;

const args = process.argv.slice(2);
const prePushMode = args.includes("--pre-push");
const remoteName = getArgValue("--remote-name");

const findings = [];
const scannedCommits = new Set();
let scannedCurrentFiles = 0;
let scannedPushedFiles = 0;

const forbiddenPathRules = [
  {
    name: "private workspace directory",
    test: (path) => /^private\//i.test(path),
  },
  {
    name: "local environment file",
    test: (path) => /(^|\/)\.env(\.|$)/i.test(path),
  },
  {
    name: "local credential config",
    test: (path) =>
      /(^|\/)(\.npmrc|\.netrc|\.pypirc|\.envrc|\.ssh\/|\.aws\/|\.azure\/|\.config\/gcloud\/)/i.test(
        path,
      ),
  },
  {
    name: "credential-like file name",
    test: (path) =>
      /(^|\/)(credentials|secrets|service-account|token)[^/]*\.(json|ya?ml|toml|ini|txt|env)$/i.test(
        path,
      ),
  },
  {
    name: "private key or certificate material",
    test: (path) => /\.(pem|key|p12|pfx|jks|keystore|crt|cert)$/i.test(path),
  },
  {
    name: "private source document",
    test: (path) =>
      /google[ -]?drive/i.test(path) || /\.(gdoc|gsheet|gslides|docx|pdf)$/i.test(path),
  },
  {
    name: "raw or private media asset",
    test: (path) =>
      /\.(mp4|mov|avi|mkv|webm|wav|aiff|mp3|m4a|aac|flac|psd|raw|dng|heic|tiff?)$/i.test(
        path,
      ),
  },
  {
    name: "proprietary font asset",
    test: (path) => /\.(otf|ttf|woff2?)$/i.test(path),
  },
  {
    name: "generated archive or release package",
    test: (path) => /\.(zip|tar|tgz|tar\.gz|7z|rar)$/i.test(path),
  },
  {
    name: "private USV package payload",
    test: (path) =>
      /\.usvpkg\/(media|assets\/voice_profiles|provenance\/signatures)\//i.test(path),
  },
];

const forbiddenContentRules = [
  {
    name: "private key block",
    pattern: /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/,
  },
  {
    name: "GitHub token",
    pattern: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{36,}\b|\bgithub_pat_[A-Za-z0-9_]{22,}_[A-Za-z0-9_]{59,}\b/,
  },
  {
    name: "OpenAI API key",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/,
  },
  {
    name: "AWS access key id",
    pattern: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,
  },
  {
    name: "Google API key",
    pattern: /\bAIza[0-9A-Za-z_-]{35}\b/,
  },
  {
    name: "Slack token",
    pattern: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,
  },
  {
    name: "Stripe secret key",
    pattern: /\bsk_(?:live|test)_[0-9A-Za-z]{16,}\b/,
  },
  {
    name: "local macOS user path",
    pattern: /\/Users\/[A-Za-z0-9._-]+\//,
  },
  {
    name: "local Windows user path",
    pattern: /C:\\Users\\[A-Za-z0-9._-]+\\/i,
  },
];

scanCurrentRepositoryFiles();

if (prePushMode) {
  const prePushInput = await readStdin();
  scanPrePushInput(prePushInput);
}

if (findings.length > 0) {
  console.error("Public safety check failed. Do not push these files to the public repository:");
  for (const finding of findings) {
    const detail = finding.detail ? ` (${finding.detail})` : "";
    console.error(`- ${finding.scope}: ${finding.path}: ${finding.reason}${detail}`);
  }
  console.error("");
  console.error("Move private material under ignored local storage, remove it from tracked commits, or document an explicit public exception before pushing.");
  process.exit(1);
}

const commitText =
  scannedCommits.size === 0
    ? ""
    : ` and ${scannedPushedFiles} file snapshots from ${scannedCommits.size} pushed commit(s)`;
console.log(`Public safety check passed: scanned ${scannedCurrentFiles} current repository file(s)${commitText}.`);

function getArgValue(name) {
  const index = args.indexOf(name);
  if (index === -1 || index + 1 >= args.length) {
    return "";
  }
  return args[index + 1] ?? "";
}

function scanCurrentRepositoryFiles() {
  const files = gitList(["ls-files", "-z", "--cached", "--others", "--exclude-standard"]);
  for (const path of files) {
    scannedCurrentFiles += 1;
    scanPath(path, "current repository file");

    let stat;
    try {
      stat = statSync(path);
    } catch {
      continue;
    }
    if (!stat.isFile()) {
      continue;
    }
    if (stat.size > MAX_FILE_BYTES) {
      addFinding("current repository file", path, "oversized current repository file", `${formatBytes(stat.size)} exceeds ${formatBytes(MAX_FILE_BYTES)}`);
      continue;
    }
    try {
      scanContent(path, readFileSync(path), "current repository file");
    } catch {
      addFinding("current repository file", path, "unreadable current repository file");
    }
  }
}

function scanPrePushInput(input) {
  for (const line of input.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    const [localRef, localSha, remoteRef, remoteSha] = trimmed.split(/\s+/);
    if (!localRef || !localSha || ZERO_OBJECT.test(localSha)) {
      continue;
    }

    const commits = pushedCommits(localSha, remoteSha);
    for (const commit of commits) {
      scannedCommits.add(commit);
      scanCommit(commit, remoteRef || "remote ref");
    }
  }
}

function pushedCommits(localSha, remoteSha) {
  if (remoteSha && !ZERO_OBJECT.test(remoteSha)) {
    return gitLines(["rev-list", `${remoteSha}..${localSha}`]);
  }

  const remoteRefs = remoteName
    ? gitLines(["for-each-ref", "--format=%(refname)", `refs/remotes/${remoteName}`])
    : [];
  if (remoteRefs.length > 0) {
    return gitLines(["rev-list", localSha, "--not", ...remoteRefs]);
  }

  return gitLines(["rev-list", localSha]);
}

function scanCommit(commit, remoteRef) {
  const paths = gitList([
    "diff-tree",
    "--root",
    "--no-commit-id",
    "-r",
    "-m",
    "--diff-filter=ACMR",
    "-z",
    "--name-only",
    commit,
  ]);

  const seenPaths = new Set(paths);
  for (const path of seenPaths) {
    scannedPushedFiles += 1;
    const scope = `pushed commit ${shortSha(commit)} -> ${remoteRef}`;
    scanPath(path, scope);

    const blob = `${commit}:${path}`;
    const size = gitBlobSize(blob);
    if (size === null) {
      continue;
    }
    if (size > MAX_FILE_BYTES) {
      addFinding(scope, path, "oversized pushed file", `${formatBytes(size)} exceeds ${formatBytes(MAX_FILE_BYTES)}`);
      continue;
    }
    scanContent(path, gitBuffer(["show", blob]), scope);
  }
}

function scanPath(path, scope) {
  const normalized = path.replaceAll("\\", "/");
  for (const rule of forbiddenPathRules) {
    if (rule.test(normalized)) {
      addFinding(scope, path, rule.name);
    }
  }
}

function scanContent(path, buffer, scope) {
  if (isBinary(buffer)) {
    addFinding(scope, path, "binary content requires explicit public review");
    return;
  }

  const text = buffer.toString("utf8");
  for (const rule of forbiddenContentRules) {
    if (rule.pattern.test(text)) {
      addFinding(scope, path, rule.name);
    }
  }
}

function addFinding(scope, path, reason, detail = "") {
  findings.push({ scope, path, reason, detail });
}

function isBinary(buffer) {
  const sampleLength = Math.min(buffer.length, 8192);
  for (let index = 0; index < sampleLength; index += 1) {
    if (buffer[index] === 0) {
      return true;
    }
  }
  return false;
}

function formatBytes(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}

function shortSha(sha) {
  return sha.slice(0, 12);
}

function gitLines(argsForGit) {
  const output = git(argsForGit).trim();
  return output ? output.split(/\r?\n/) : [];
}

function gitList(argsForGit) {
  const output = git(argsForGit);
  return output.split("\0").filter(Boolean);
}

function gitBlobSize(blob) {
  try {
    return Number.parseInt(git(["cat-file", "-s", blob]).trim(), 10);
  } catch {
    return null;
  }
}

function git(argsForGit) {
  return execFileSync("git", argsForGit, {
    encoding: "utf8",
    maxBuffer: MAX_FILE_BYTES + 1024 * 1024,
  });
}

function gitBuffer(argsForGit) {
  return execFileSync("git", argsForGit, {
    encoding: "buffer",
    maxBuffer: MAX_FILE_BYTES + 1024 * 1024,
  });
}

async function readStdin() {
  if (process.stdin.isTTY) {
    return "";
  }

  let input = "";
  for await (const chunk of process.stdin) {
    input += chunk;
  }
  return input;
}
