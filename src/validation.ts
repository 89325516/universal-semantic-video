import { createSidecarValidator, formatValidationErrors } from "./schema.js";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateSidecarDocument(document: unknown): ValidationResult {
  const validate = createSidecarValidator();
  const valid = validate(document);

  return {
    valid,
    errors: valid ? [] : formatValidationErrors(validate.errors)
  };
}
