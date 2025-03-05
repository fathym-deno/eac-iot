import {
  EaCActuatorErrorResponse,
  EaCActuatorRequest,
  EaCActuatorResponse,
  EaCIoTAsCode,
  EaCRuntimeHandlers,
  ensureIoTDevices,
  EverythingAsCode,
  EverythingAsCodeClouds,
  EverythingAsCodeIoT,
} from "../.deps.ts";

export default {
  async POST(req, ctx) {
    const logger = ctx.Runtime.Logs;

    try {
      // const username = ctx.state.Username;

      const handlerRequest: EaCActuatorRequest = await req.json();

      logger.Package.debug(
        `Processing EaC commit ${handlerRequest.CommitID} IoT processes for IoT ${handlerRequest.Lookup}`,
      );

      const eac:
        & EverythingAsCode
        & EverythingAsCodeIoT
        & EverythingAsCodeClouds = handlerRequest.EaC;

      const currentIoT = eac.IoT || {};

      const iotLookup = handlerRequest.Lookup;

      const current = currentIoT[iotLookup] || {};

      const iot = handlerRequest.Model as EaCIoTAsCode;

      const iotCloud = eac.Clouds![current.CloudLookup!];

      const devicesResp = await ensureIoTDevices(
        logger.Package,
        iotCloud,
        current,
        iot,
      );

      if (Object.keys(devicesResp || {}).length === 0) {
        return Response.json({
          Checks: [],
          Lookup: iotLookup,
          Messages: {
            Message: `The iot '${iotLookup}' has been handled.`,
          },
          Model: iot,
        } as EaCActuatorResponse);
      } else {
        return Response.json({
          HasError: true,
          Messages: {
            Errors: devicesResp,
          },
        } as EaCActuatorErrorResponse);
      }
    } catch (err) {
      logger.Package.error(
        "There was an error configuring the IoT device",
        err,
      );

      return Response.json({
        HasError: true,
        Messages: {
          Error: JSON.stringify(err),
        },
      } as EaCActuatorErrorResponse);
    }
  },
} as EaCRuntimeHandlers;
