#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync } from "node:fs";
import { validateSidecarDocument } from "./validation.js";

function readJsonFile(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8")) as unknown;
}

const program = new Command();

program
  .name("usv")
  .description("Validate Universal Semantic Video sidecar files. / USV-Sidecar-Dateien validieren.")
  .version("0.1.0");

program
  .command("validate")
  .argument("<file>", "Path to a .usv.json file. / Pfad zu einer .usv.json-Datei.")
  .description("Validate a USV sidecar. / Ein USV-Sidecar validieren.")
  .action((file: string) => {
    try {
      const document = readJsonFile(file);
      const result = validateSidecarDocument(document);

      if (result.valid) {
        console.log("USV sidecar is valid. / USV-Sidecar ist gueltig.");
        process.exitCode = 0;
        return;
      }

      console.error("USV sidecar is invalid. / USV-Sidecar ist ungueltig.");
      for (const error of result.errors) {
        console.error(`- ${error}`);
      }
      process.exitCode = 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`System error. / Systemfehler: ${message}`);
      process.exitCode = 2;
    }
  });

program.parse();
