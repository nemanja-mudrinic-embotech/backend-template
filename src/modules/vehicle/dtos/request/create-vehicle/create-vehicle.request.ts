import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import {VehicleType} from "../../../enum/vehicle-type.enum.ts";
import {VehicleStatus} from "../../../enum/vehicle-status.enum.ts";

extendZodWithOpenApi(z);

export const createVehicleRequestSchema = z
    .object({
        vehicleNumber: z.string(),
        vehicleName: z.string(),
        currentChargeLevel: z.number(),
        type: z.nativeEnum(VehicleType),
        status: z.nativeEnum(VehicleStatus),
    })
    .openapi("CreateVehicleRequest", {
        example: {
            vehicleNumber: "124",
            vehicleName: "BMW",
            currentChargeLevel: 25,
            type: VehicleType.Big,
            status: VehicleStatus.Running,
        },
    });

export type CreateTaskRequest = z.infer<typeof createVehicleRequestSchema>;
