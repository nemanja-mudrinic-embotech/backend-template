import {vehicleSingleFullResponseSchema} from "../vehicle-single-full/vehicle-single-full.response.ts";
import {VehicleType} from "../../../enum/vehicle-type.enum.ts";
import {VehicleStatus} from "../../../enum/vehicle-status.enum.ts";

describe("taskListResponseSchema", () => {
    it("should validate correct data", () => {
        const validData = {
            items: [
                {
                    id: "12345",
                    vehicleNumber: "124",
                    vehicleName: "BMW",
                    currentChargeLevel: 25,
                    type: VehicleType.Big,
                    status: VehicleStatus.Running,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            count: 1,
        };

        const validationResult = vehicleSingleFullResponseSchema.safeParse(validData);

        expect(validationResult.success).toBeTruthy();
    });

    it("should fail validation on invalid task items", () => {
        const invalidTaskData: any = {
            items: [
                {
                    id: "12345",
                    vehicleNumber: "124",
                    vehicleName: "BMW",
                    currentChargeLevel: 25,
                    type: VehicleType.Big,
                    status: VehicleStatus.Running,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            count: 1,
        };

        const validationResult = vehicleSingleFullResponseSchema.safeParse(invalidTaskData);

        expect(validationResult.success).toBeFalsy();
    });

    it("should fail validation on missing pagination fields", () => {
        const missingPaginationData: any = {
            items: [
                {
                    id: "12345",
                    vehicleNumber: "124",
                    vehicleName: "BMW",
                    currentChargeLevel: 25,
                    type: VehicleType.Big,
                    status: VehicleStatus.Running,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
        };

        const validationResult = vehicleSingleFullResponseSchema.safeParse(
            missingPaginationData,
        );

        expect(validationResult.success).toBeFalsy();
    });
});
