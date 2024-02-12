import {vehicleSingleFullResponseSchema} from "./vehicle-single-full.response.ts";
import {VehicleType} from "../../../enum/vehicle-type.enum.ts";
import {VehicleStatus} from "../../../enum/vehicle-status.enum.ts";


describe("vehicleSingleFullResponseSchema", () => {
    it("should validate correct data", () => {
        const validData = {
            id: "12345",
            vehicleNumber: "124",
            vehicleName: "BMW",
            currentChargeLevel: 25,
            type: VehicleType.Big,
            status: VehicleStatus.Running,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const validationResult = vehicleSingleFullResponseSchema.safeParse(validData);

        expect(validationResult.success).toBeTruthy();
    });

    it("should fail validation on number done field", () => {
        const invalidDoneData: any = {
            id: "12345",
            vehicleNumber: "124",
            vehicleName: "BMW",
            currentChargeLevel: 25,
            type: VehicleType.Big,
            status: VehicleStatus.Running,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const validationResult = vehicleSingleFullResponseSchema.safeParse(invalidDoneData);

        expect(validationResult.success).toBeFalsy();
    });

    it("should fail validation on missing fields", () => {
        const missingFieldsData: any = {
            id: "12345",
            vehicleNumber: "124",
            vehicleName: "BMW",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const validationResult = vehicleSingleFullResponseSchema.safeParse(missingFieldsData);

        expect(validationResult.success).toBeFalsy();
    });
});
