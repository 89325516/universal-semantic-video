import { validateSidecarDocument, type ValidationResult } from "./validation.js";

interface IdObject {
  id: string;
}

interface Scope {
  object_refs?: readonly string[];
  event_refs?: readonly string[];
}

interface CoreSidecar {
  media: {
    duration_seconds: number;
    primary_language: string;
  };
  semantic: {
    objects: readonly (IdObject & {
      rights_policy_ref?: string;
    })[];
    events: readonly (IdObject & {
      time: {
        start: number;
        end: number;
      };
      object_refs: readonly string[];
    })[];
    relations: readonly (IdObject & {
      from: string;
      to: readonly string[];
    })[];
  };
  localization: {
    default_target_languages: readonly string[];
    intents: readonly {
      target_language: string;
      scope: Scope;
    }[];
    translations: readonly {
      source_ref: string;
      language: string;
    }[];
  };
  rendering: {
    plans: readonly {
      target_language: string;
      scope: Scope;
    }[];
  };
  rights: {
    policies: readonly IdObject[];
  };
  provenance: {
    records: readonly IdObject[];
  };
  fallbacks: {
    subtitles: readonly {
      language: string;
    }[];
  };
}

export interface ConformanceResult {
  valid: boolean;
  schema: ValidationResult;
  errors: string[];
}

export function checkCoreConformance(document: unknown): ConformanceResult {
  const schema = validateSidecarDocument(document);

  if (!schema.valid) {
    return {
      valid: false,
      schema,
      errors: []
    };
  }

  const sidecar = document as CoreSidecar;
  const errors: string[] = [];
  const objectIds = idSet(sidecar.semantic.objects);
  const eventIds = idSet(sidecar.semantic.events);
  const relationIds = idSet(sidecar.semantic.relations);
  const rightsPolicyIds = idSet(sidecar.rights.policies);
  const provenanceRecordIds = idSet(sidecar.provenance.records);
  const semanticIds = union(objectIds, eventIds, relationIds);
  const declaredLanguages = new Set([
    sidecar.media.primary_language,
    ...sidecar.localization.default_target_languages
  ]);

  checkUniqueIds("semantic.objects", sidecar.semantic.objects, errors);
  checkUniqueIds("semantic.events", sidecar.semantic.events, errors);
  checkUniqueIds("semantic.relations", sidecar.semantic.relations, errors);
  checkUniqueIds("rights.policies", sidecar.rights.policies, errors);
  checkUniqueIds("provenance.records", sidecar.provenance.records, errors);
  checkDisjointIds("semantic", [
    ["objects", objectIds],
    ["events", eventIds],
    ["relations", relationIds]
  ], errors);

  sidecar.semantic.objects.forEach((object, index) => {
    if (object.rights_policy_ref) {
      requireRef(`semantic.objects[${index}].rights_policy_ref`, object.rights_policy_ref, rightsPolicyIds, errors);
    }
  });

  sidecar.semantic.events.forEach((event, index) => {
    if (event.time.start >= event.time.end) {
      errors.push(`semantic.events[${index}].time: start must be less than end`);
    }
    if (event.time.end > sidecar.media.duration_seconds) {
      errors.push(`semantic.events[${index}].time.end: must not exceed media.duration_seconds`);
    }
    requireRefs(`semantic.events[${index}].object_refs`, event.object_refs, objectIds, errors);
  });

  sidecar.semantic.relations.forEach((relation, index) => {
    requireRef(`semantic.relations[${index}].from`, relation.from, semanticIds, errors);
    requireRefs(`semantic.relations[${index}].to`, relation.to, semanticIds, errors);
  });

  sidecar.localization.intents.forEach((intent, index) => {
    requireLanguage(`localization.intents[${index}].target_language`, intent.target_language, declaredLanguages, errors);
    checkScope(`localization.intents[${index}].scope`, intent.scope, objectIds, eventIds, errors);
  });

  sidecar.localization.translations.forEach((translation, index) => {
    requireRef(`localization.translations[${index}].source_ref`, translation.source_ref, semanticIds, errors);
    requireLanguage(`localization.translations[${index}].language`, translation.language, declaredLanguages, errors);
  });

  sidecar.rendering.plans.forEach((plan, index) => {
    requireLanguage(`rendering.plans[${index}].target_language`, plan.target_language, declaredLanguages, errors);
    checkScope(`rendering.plans[${index}].scope`, plan.scope, objectIds, eventIds, errors);
  });

  sidecar.fallbacks.subtitles.forEach((subtitle, index) => {
    requireLanguage(`fallbacks.subtitles[${index}].language`, subtitle.language, declaredLanguages, errors);
  });

  return {
    valid: errors.length === 0,
    schema,
    errors
  };
}

function idSet(items: readonly IdObject[]): Set<string> {
  return new Set(items.map((item) => item.id));
}

function union(...sets: readonly Set<string>[]): Set<string> {
  return new Set(sets.flatMap((set) => [...set]));
}

function checkUniqueIds(path: string, items: readonly IdObject[], errors: string[]): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) {
      errors.push(`${path}: duplicate id '${item.id}'`);
    }
    seen.add(item.id);
  }
}

function checkDisjointIds(path: string, groups: readonly [string, Set<string>][], errors: string[]): void {
  const ownerById = new Map<string, string>();
  for (const [group, ids] of groups) {
    for (const id of ids) {
      const previousOwner = ownerById.get(id);
      if (previousOwner) {
        errors.push(`${path}: id '${id}' appears in both ${previousOwner} and ${group}`);
      }
      ownerById.set(id, group);
    }
  }
}

function checkScope(path: string, scope: Scope, objectIds: Set<string>, eventIds: Set<string>, errors: string[]): void {
  requireRefs(`${path}.object_refs`, scope.object_refs ?? [], objectIds, errors);
  requireRefs(`${path}.event_refs`, scope.event_refs ?? [], eventIds, errors);
}

function requireRefs(path: string, refs: readonly string[], allowedIds: Set<string>, errors: string[]): void {
  for (const ref of refs) {
    requireRef(path, ref, allowedIds, errors);
  }
}

function requireRef(path: string, ref: string, allowedIds: Set<string>, errors: string[]): void {
  if (!allowedIds.has(ref)) {
    errors.push(`${path}: unknown reference '${ref}'`);
  }
}

function requireLanguage(path: string, language: string, declaredLanguages: Set<string>, errors: string[]): void {
  if (!declaredLanguages.has(language)) {
    errors.push(`${path}: language '${language}' is not declared by media.primary_language or localization.default_target_languages`);
  }
}
