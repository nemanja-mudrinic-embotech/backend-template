import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

import type {IVehicle} from "../../../../../config/db/schemas/vehicle.schema.ts";
import {VehicleType} from "../../../enum/vehicle-type.enum.ts";
import {VehicleStatus} from "../../../enum/vehicle-status.enum.ts";

extendZodWithOpenApi(z);

export const vehicleSingleFullResponseSchema = z
    .object({
        id: z.string(),
        vehicleNumber: z.string(),
        vehicleName: z.string(),
        currentChargeLevel: z.number(),
        type: z.nativeEnum(VehicleType),
        status: z.nativeEnum(VehicleStatus),
        createdAt: z.date(),
        updatedAt: z.date(),
    })
    .openapi("VehicleSingleFullResponse");

export type VehicleSingleFullResponse = z.infer<typeof vehicleSingleFullResponseSchema>;

export const mapVehicleToVehicleSingleFullResponse = (vehicle: IVehicle): VehicleSingleFullResponse => ({
    id: vehicle._id,
    vehicleNumber: vehicle.vehicleNumber,
    vehicleName: vehicle.vehicleName,
    currentChargeLevel: vehicle.currentChargeLevel,
    type: vehicle.type,
    status: vehicle.status,
    createdAt: vehicle.createdAt,
    updatedAt: vehicle.updatedAt,
});
