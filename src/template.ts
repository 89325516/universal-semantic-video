export function createStarterSidecar(): Record<string, unknown> {
  return {
    usv_version: "0.1.0",
    media: {
      id: "media_starter",
      type: "video",
      container: "sidecar",
      duration_seconds: 1,
      primary_language: "en-US"
    },
    semantic: {
      objects: [],
      events: [],
      relations: []
    },
    localization: {
      default_target_languages: ["de-DE"],
      glossary: {},
      intents: [],
      translations: []
    },
    rendering: {
      capability_levels: {
        minimum: ["show_original", "show_subtitle"],
        recommended: ["overlay_labels", "verify_provenance"],
        advanced: ["replace_in_place", "spatial_audio_render"]
      },
      plans: []
    },
    rights: {
      policies: [
        {
          id: "rights_default",
          allow_ai: false,
          requires_human_review: true,
          allow_voice_clone: false,
          required_disclosure: true,
          consent_status: "unknown"
        }
      ]
    },
    provenance: {
      status: "unknown",
      c2pa_manifest_ref: null,
      records: [
        {
          id: "prov_starter",
          action: "authored",
          agent: "USV CLI starter"
        }
      ]
    },
    fallbacks: {
      subtitles: []
    }
  };
}
