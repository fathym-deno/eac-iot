export { Logger } from "jsr:@std/log@0.224.14/logger";

export type { EverythingAsCode } from "jsr:@fathym/eac@0.2.113";

export type {
  EaCCloudAsCode,
  EaCCloudAzureDetails,
  EverythingAsCodeClouds,
} from "jsr:@fathym/eac-azure@0.0.90";
export { loadAzureCloudCredentials } from "jsr:@fathym/eac-azure@0.0.90/utils";

export { IotHubClient } from "npm:@azure/arm-iothub@6.3.0";
export { Registry as IoTRegistry } from "npm:azure-iothub@1.16.5";

export type {
  EaCDeviceAsCode,
  EaCDeviceDetails,
  EaCIoTAsCode,
  EverythingAsCodeIoT,
} from "../iot/.exports.ts";
export type { EnsureIoTDevicesResponse } from "../steward/api/.exports.ts";
