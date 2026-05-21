import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { checkCoreConformance } from "../src/conformance.js";
import { validateSidecarDocument } from "../src/validation.js";

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8")) as unknown;
}

describe("USV sidecar validation", () => {
  it("accepts the public airport scene example", () => {
    const document = readJson("examples/lite/airport-scene.usv.json");
    const result = validateSidecarDocument(document);

    expect(result).toEqual({
      valid: true,
      errors: []
    });
  });

  it("rejects an example without a version", () => {
    const document = readJson("examples/invalid/missing-version.usv.json");
    const result = validateSidecarDocument(document);

    expect(result.valid).toBe(false);
    expect(result.errors.join("\n")).toContain("usv_version");
  });

  it("accepts core conformance for the public airport scene example", () => {
    const document = readJson("examples/lite/airport-scene.usv.json");
    const result = checkCoreConformance(document);

    expect(result).toEqual({
      valid: true,
      schema: {
        valid: true,
        errors: []
      },
      errors: []
    });
  });

  it("accepts core conformance for the public audio-visual example", () => {
    const document = readJson("examples/lite/audio-visual-announcement.usv.json");
    const result = checkCoreConformance(document);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("rejects schema-valid sidecars with broken semantic references", () => {
    const document = readJson("examples/invalid/broken-reference.usv.json");
    const schema = validateSidecarDocument(document);
    const conformance = checkCoreConformance(document);

    expect(schema.valid).toBe(true);
    expect(conformance.valid).toBe(false);
    expect(conformance.errors.join("\n")).toContain("obj_missing");
    expect(conformance.errors.join("\n")).toContain("evt_missing");
  });

  it("returns exit 0 for the valid example", () => {
    execFileSync("node", ["dist/cli.js", "validate", "examples/lite/airport-scene.usv.json"], {
      stdio: "pipe"
    });
  });

  it("returns a non-zero exit code for the invalid example", () => {
    expect(() =>
      execFileSync("node", ["dist/cli.js", "validate", "examples/invalid/missing-version.usv.json"], {
        stdio: "pipe"
      })
    ).toThrow();
  });

  it("creates a valid starter sidecar from the CLI", () => {
    const directory = mkdtempSync(join(tmpdir(), "usv-"));
    const file = join(directory, "starter.usv.json");

    try {
      execFileSync("node", ["dist/cli.js", "init", file], {
        stdio: "pipe"
      });

      const document = readJson(file);
      const result = validateSidecarDocument(document);

      expect(result).toEqual({
        valid: true,
        errors: []
      });
    } finally {
      rmSync(directory, {
        recursive: true,
        force: true
      });
    }
  });

  it("does not overwrite an existing file during starter creation", () => {
    const directory = mkdtempSync(join(tmpdir(), "usv-"));
    const file = join(directory, "existing.usv.json");

    try {
      writeFileSync(file, "original", "utf8");

      expect(() =>
        execFileSync("node", ["dist/cli.js", "init", file], {
          stdio: "pipe"
        })
      ).toThrow();
      expect(readFileSync(file, "utf8")).toBe("original");
    } finally {
      rmSync(directory, {
        recursive: true,
        force: true
      });
    }
  });

  it("prints a summary for a valid sidecar", () => {
    const output = execFileSync("node", ["dist/cli.js", "inspect", "examples/lite/airport-scene.usv.json"], {
      encoding: "utf8"
    });

    expect(output).toContain("USV version: 0.1.0");
    expect(output).toContain("Semantic objects: 2");
    expect(output).toContain("Target languages: de-DE");
  });

  it("returns exit 0 for core conformance on the valid example", () => {
    execFileSync("node", ["dist/cli.js", "conformance", "examples/lite/airport-scene.usv.json"], {
      stdio: "pipe"
    });
  });

  it("returns a non-zero exit code for broken core conformance", () => {
    expect(() =>
      execFileSync("node", ["dist/cli.js", "conformance", "examples/invalid/broken-reference.usv.json"], {
        stdio: "pipe"
      })
    ).toThrow();
  });
});
