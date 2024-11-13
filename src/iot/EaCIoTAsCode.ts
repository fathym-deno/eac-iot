import { EaCDetails } from "./.deps.ts";
import { EaCDashboardAsCode } from "./EaCDashboardAsCode.ts";
import { EaCDeviceAsCode } from "./EaCDeviceAsCode.ts";
import { EaCIoTDetails } from "./EaCIoTDetails.ts";

export type EaCIoTAsCode = {
  CloudLookup?: string;

  Dashboards?: Record<string, EaCDashboardAsCode>;

  Devices?: Record<string, EaCDeviceAsCode>;

  ResourceGroupLookup?: string;
} & EaCDetails<EaCIoTDetails>;
