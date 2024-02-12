import {getVehicleFullListQueryRequestSchema} from "./get-all-vehicle-pageable.request.ts";

describe("getVehicleFullListQueryRequestSchema", () => {
    it("should validate correct data", () => {
        const validData = {};

        const validationResult = getVehicleFullListQueryRequestSchema.safeParse(validData);

        expect(validationResult.success).toBeTruthy();
    });

    it("should validate data with optional fields missing", () => {
        const validData = {
            page: 1,
            size: 10,
        };

        const validationResult = getVehicleFullListQueryRequestSchema.safeParse(validData);

        expect(validationResult.success).toBeTruthy();
    });

    it("should fail validation on invalid date", () => {
        const invalidDateData: any = {
            createdAt: "invalid-date",
            page: 1,
            size: 10,
        };

        const validationResult =
            getVehicleFullListQueryRequestSchema.safeParse(invalidDateData);

        expect(validationResult.success).toBeFalsy();
    });
});
