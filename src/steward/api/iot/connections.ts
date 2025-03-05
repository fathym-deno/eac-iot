import {
  EaCActuatorConnectionsRequest,
  EaCActuatorConnectionsResponse,
  EaCIoTAsCode,
  EaCRuntimeHandlers,
  EverythingAsCode,
  EverythingAsCodeClouds,
  EverythingAsCodeIoT,
  loadIoTDevicesConnections,
} from "../.deps.ts";

export default {
  async POST(req, ctx) {
    const handlerRequest: EaCActuatorConnectionsRequest = await req.json();

    const eac: EverythingAsCode & EverythingAsCodeIoT & EverythingAsCodeClouds =
      handlerRequest.EaC;

    const iotDef = handlerRequest.Model as EaCIoTAsCode;

    let deviceLookups = Object.keys(iotDef.Devices || {});

    const iot = handlerRequest.Current as EaCIoTAsCode;

    if (deviceLookups.length === 0) {
      deviceLookups = Object.keys(iot.Devices || {});
    }

    return Response.json({
      Model: {
        Devices: await loadIoTDevicesConnections(
          eac,
          iot,
          iotDef.Devices!,
          iot.Devices!,
          deviceLookups,
        ),
      } as EaCIoTAsCode,
    } as EaCActuatorConnectionsResponse);
  },
} as EaCRuntimeHandlers;
