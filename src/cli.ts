#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync, writeFileSync } from "node:fs";
import { checkCoreConformance } from "./conformance.js";
import { createStarterSidecar } from "./template.js";
import { validateSidecarDocument } from "./validation.js";
import { summarizeSidecar } from "./summary.js";

function readJsonFile(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8")) as unknown;
}

function printValidationErrors(errors: string[]): void {
  console.error("USV sidecar is invalid. / USV-Sidecar ist ungueltig.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
}

function printConformanceErrors(errors: string[]): void {
  console.error("USV core conformance failed. / USV-Core-Conformance fehlgeschlagen.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
}

const program = new Command();

program
  .name("usv")
  .description("Work with Universal Semantic Video sidecar files. / Mit USV-Sidecar-Dateien arbeiten.")
  .version("0.1.0");

program
  .command("init")
  .argument("<file>", "Path for a new .usv.json file. / Pfad fuer eine neue .usv.json-Datei.")
  .description("Create a valid starter sidecar. / Ein gueltiges Starter-Sidecar erzeugen.")
  .action((file: string) => {
    try {
      const document = createStarterSidecar();
      const result = validateSidecarDocument(document);

      if (!result.valid) {
        printValidationErrors(result.errors);
        process.exitCode = 1;
        return;
      }

      writeFileSync(file, `${JSON.stringify(document, null, 2)}\n`, {
        encoding: "utf8",
        flag: "wx"
      });
      console.log(`Created ${file}. / ${file} erstellt.`);
      process.exitCode = 0;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`System error. / Systemfehler: ${message}`);
      process.exitCode = 2;
    }
  });

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

      printValidationErrors(result.errors);
      process.exitCode = 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`System error. / Systemfehler: ${message}`);
      process.exitCode = 2;
    }
  });

program
  .command("conformance")
  .argument("<file>", "Path to a .usv.json file. / Pfad zu einer .usv.json-Datei.")
  .description("Run schema and core conformance checks. / Schema- und Core-Conformance-Pruefungen ausfuehren.")
  .action((file: string) => {
    try {
      const document = readJsonFile(file);
      const result = checkCoreConformance(document);

      if (!result.schema.valid) {
        printValidationErrors(result.schema.errors);
        process.exitCode = 1;
        return;
      }

      if (!result.valid) {
        printConformanceErrors(result.errors);
        process.exitCode = 1;
        return;
      }

      console.log("USV core conformance passed. / USV-Core-Conformance bestanden.");
      process.exitCode = 0;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`System error. / Systemfehler: ${message}`);
      process.exitCode = 2;
    }
  });

program
  .command("inspect")
  .argument("<file>", "Path to a .usv.json file. / Pfad zu einer .usv.json-Datei.")
  .description("Validate and summarize a USV sidecar. / Ein USV-Sidecar validieren und zusammenfassen.")
  .action((file: string) => {
    try {
      const document = readJsonFile(file);
      const result = validateSidecarDocument(document);

      if (!result.valid) {
        printValidationErrors(result.errors);
        process.exitCode = 1;
        return;
      }

      for (const line of summarizeSidecar(document)) {
        console.log(line);
      }
      process.exitCode = 0;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`System error. / Systemfehler: ${message}`);
      process.exitCode = 2;
    }
  });

program.parse();
