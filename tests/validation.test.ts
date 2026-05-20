import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
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
});
