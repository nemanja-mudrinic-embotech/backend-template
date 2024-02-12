import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { pageableResponseSchema } from "../../../../../lib/dto/response/pageable.response";
import {
    type VehicleSingleFullResponse,
    vehicleSingleFullResponseSchema
} from "../vehicle-single-full/vehicle-single-full.response.ts";

extendZodWithOpenApi(z);
export const vehicleListFullResponseSchema = pageableResponseSchema<VehicleSingleFullResponse>(
    vehicleSingleFullResponseSchema
).openapi("VehicleListFullResponse");

export type VehicleListFullResponse = z.infer<typeof vehicleListFullResponseSchema>;
