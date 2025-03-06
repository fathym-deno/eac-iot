import {
  buildStewardApiPluginConfig,
  EaCRuntimeConfig,
  EaCRuntimePlugin,
  EaCRuntimePluginConfig,
  EaCStewardPluginOptions,
  EverythingAsCode,
  EverythingAsCodeApplications,
  EverythingAsCodeDenoKV,
} from "./.deps.ts";

export type EaCIoTStewardPluginOptions = EaCStewardPluginOptions;

export default class EaCIoTStewardPlugin implements EaCRuntimePlugin {
  constructor(protected options: EaCIoTStewardPluginOptions) {}

  public Setup(_config: EaCRuntimeConfig): Promise<EaCRuntimePluginConfig> {
    const stewardApiMetaPath = import.meta.resolve("../api/iot");

    const pluginConfig: EaCRuntimePluginConfig<
      EverythingAsCode & EverythingAsCodeApplications & EverythingAsCodeDenoKV
    > = buildStewardApiPluginConfig(
      EaCIoTStewardPlugin.name,
      stewardApiMetaPath,
      "core",
      "steward-iot",
      "fathym:eac-iot/steward/api",
      "/api/steward/iot*",
      "@fathym/eac-iot",
      this.options,
      "/src/steward/api/iot/",
    );

    return Promise.resolve(pluginConfig);
  }
}
