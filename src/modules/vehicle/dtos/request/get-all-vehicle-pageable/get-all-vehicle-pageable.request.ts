import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

import { pageableRequestSchema } from "../../../../../lib/dto/request/pageable.request";
import {VehicleType} from "../../../enum/vehicle-type.enum.ts";
import {VehicleStatus} from "../../../enum/vehicle-status.enum.ts";

extendZodWithOpenApi(z);

const getVehicleFullListQuerySchema = z
    .object({
        vehicleNumber: z.string().optional(),
        vehicleName: z.date().optional(),
        currentChargeLevel: z.number().optional(),
        type: z.nativeEnum(VehicleType).optional(),
        status: z.nativeEnum(VehicleStatus).optional(),
        createdAt: z.date().optional(),
    })
    .openapi("GetVehicleFullListQueryRequest", {
        example: {
            vehicleNumber: "bmw",
        },
    });

export const getVehicleFullListQueryRequestSchema = pageableRequestSchema.merge(
    getVehicleFullListQuerySchema,
);

export type GetVehicleFullListQueryRequest = z.infer<
    typeof getVehicleFullListQueryRequestSchema
>;
