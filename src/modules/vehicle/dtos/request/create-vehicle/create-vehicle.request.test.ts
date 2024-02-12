import {createVehicleRequestSchema} from "./create-vehicle.request.ts";
import {VehicleType} from "../../../enum/vehicle-type.enum.ts";
import {VehicleStatus} from "../../../enum/vehicle-status.enum.ts";


describe("createTaskRequestRequestSchema", () => {
    it("should validate correct data", () => {
        const validData = {
            vehicleNumber: "124",
            vehicleName: "BMW",
            currentChargeLevel: 25,
            type: VehicleType.Big,
            status: VehicleStatus.Running,
        };

        const validationResult =
            createVehicleRequestSchema.safeParse(validData);

        expect(validationResult.success).toBeTruthy();
    });

    it("should fail validation on missing vehicle name", () => {
        const missingTitleData: any = {
            vehicleNumber: "124",
            currentChargeLevel: 25,
            type: VehicleType.Big,
            status: VehicleStatus.Running,
        };

        const validationResult =
            createVehicleRequestSchema.safeParse(missingTitleData);

        expect(validationResult.success).toBeFalsy();
    });
});
