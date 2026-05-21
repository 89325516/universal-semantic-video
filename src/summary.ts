interface SummarySidecar {
  usv_version: string;
  media: {
    id: string;
    type: string;
    duration_seconds: number;
    primary_language: string;
  };
  semantic: {
    objects: readonly unknown[];
    events: readonly unknown[];
    relations: readonly unknown[];
  };
  localization: {
    default_target_languages: readonly string[];
    intents: readonly unknown[];
    translations: readonly unknown[];
  };
  rendering: {
    plans: readonly unknown[];
  };
  rights: {
    policies: readonly unknown[];
  };
  provenance: {
    status: string;
    records: readonly unknown[];
  };
  fallbacks: {
    subtitles: readonly unknown[];
  };
}

function formatTargets(targets: readonly string[]): string {
  return targets.length > 0 ? targets.join(", ") : "none";
}

export function summarizeSidecar(document: unknown): string[] {
  const sidecar = document as SummarySidecar;

  return [
    `USV version: ${sidecar.usv_version}`,
    `Media: ${sidecar.media.id} (${sidecar.media.type}, ${sidecar.media.duration_seconds}s, ${sidecar.media.primary_language})`,
    `Semantic objects: ${sidecar.semantic.objects.length}`,
    `Semantic events: ${sidecar.semantic.events.length}`,
    `Semantic relations: ${sidecar.semantic.relations.length}`,
    `Target languages: ${formatTargets(sidecar.localization.default_target_languages)}`,
    `Localization intents: ${sidecar.localization.intents.length}`,
    `Translations: ${sidecar.localization.translations.length}`,
    `Rendering plans: ${sidecar.rendering.plans.length}`,
    `Rights policies: ${sidecar.rights.policies.length}`,
    `Provenance: ${sidecar.provenance.status} (${sidecar.provenance.records.length} records)`,
    `Subtitle fallbacks: ${sidecar.fallbacks.subtitles.length}`
  ];
}
