import { Ajv2020, type AnySchema, type ErrorObject, type ValidateFunction } from "ajv/dist/2020.js";
import { readFileSync } from "node:fs";

const schemaUrl = new URL("../schema/usv.schema.json", import.meta.url);
const referenceSchemaUrls = [
  new URL("../schema/defs/common.schema.json", import.meta.url),
  new URL("../schema/defs/media.schema.json", import.meta.url),
  new URL("../schema/defs/semantic.schema.json", import.meta.url),
  new URL("../schema/defs/localization.schema.json", import.meta.url),
  new URL("../schema/defs/rendering.schema.json", import.meta.url),
  new URL("../schema/defs/rights.schema.json", import.meta.url),
  new URL("../schema/defs/provenance.schema.json", import.meta.url),
  new URL("../schema/defs/fallbacks.schema.json", import.meta.url)
];

export function loadSidecarSchema(): unknown {
  return JSON.parse(readFileSync(schemaUrl, "utf8")) as unknown;
}

function loadReferenceSchemas(): unknown[] {
  return referenceSchemaUrls.map((url) => JSON.parse(readFileSync(url, "utf8")) as unknown);
}

export function createSidecarValidator(): ValidateFunction {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true
  });

  for (const schema of loadReferenceSchemas()) {
    ajv.addSchema(schema as AnySchema);
  }

  return ajv.compile(loadSidecarSchema() as AnySchema);
}

export function formatValidationErrors(errors: ErrorObject[] | null | undefined): string[] {
  return (errors ?? []).map((error) => {
    const location = error.instancePath || "/";

    if (error.keyword === "required") {
      const params = error.params as { missingProperty?: string };
      return `${location}: missing required property '${params.missingProperty ?? "unknown"}'`;
    }

    return `${location}: ${error.message ?? error.keyword}`;
  });
}
