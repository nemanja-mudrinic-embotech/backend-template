import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { registry } from "../../../config/swagger/swagger-registry";
import {createVehicleRequestSchema} from "../dtos/request/create-vehicle/create-vehicle.request.ts";
import {vehicleSingleFullResponseSchema} from "../dtos/response/vehicle-single-full/vehicle-single-full.response.ts";
import {
    getVehicleFullListQueryRequestSchema
} from "../dtos/request/get-all-vehicle-pageable/get-all-vehicle-pageable.request.ts";
import {vehicleListFullResponseSchema} from "../dtos/response/vehicle-list-full/vehicle-list-full.response.ts";

extendZodWithOpenApi(z);

export const registerVehicleOpenApi = () => {
    registry.registerPath({
        tags: ["Vehicles"],
        method: "post",
        path: "/api/v1/vehicles",
        description: "Create vehicle endpoint",
        request: {
            body: {
                description: "body",
                content: {
                    "application/json": {
                        schema: createVehicleRequestSchema,
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Object with user data.",
                content: {
                    "application/json": {
                        schema: vehicleSingleFullResponseSchema,
                    },
                },
            },
        },
    });
    registry.registerPath({
        tags: ["Vehicles"],
        method: "get",
        path: `/api/v1/vehicles`,
        description: "Get vehicles endpoint",
        request: {
            query: getVehicleFullListQueryRequestSchema,
        },
        responses: {
            200: {
                description: "Object with user data.",
                content: {
                    "application/json": {
                        schema: vehicleListFullResponseSchema,
                    },
                },
            },
        },
    });
    registry.registerPath({
        tags: ["Vehicles"],
        method: "get",
        path: `/api/v1/vehicles/{id}`,
        description: "Get vehicles endpoint",
        request: {
            params: z.object({
                id: z.string().openapi({ example: "1212121" }),
            }),
        },
        responses: {
            200: {
                description: "Object with user data.",
                content: {
                    "application/json": {
                        schema: vehicleListFullResponseSchema,
                        examples: {
                            'empty-list': {items: [], count: 0},
                            'full-list': {
                                "items": [
                                    {
                                        "id": "string",
                                        "vehicleNumber": "string",
                                        "vehicleName": "string",
                                        "currentChargeLevel": 0,
                                        "type": "Small",
                                        "status": "Running",
                                        "createdAt": "string",
                                        "updatedAt": "string"
                                    }
                                ],
                                "count": 0
                            }
                        }
                    },
                },
            },
        },
    });
};
