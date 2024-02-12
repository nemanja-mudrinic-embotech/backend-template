import type {AppPromise} from "../../../../lib/types/app-result.ts";
import type {IVehicle} from "../../../../config/db/schemas/vehicle.schema.ts";

export interface IVehicleRepository {
    createVehicle(): AppPromise<IVehicle>
    findAllVehiclesPageable(query: Partial<IVehicle>, sortAndPageable: {
        offset: number;
        limit: number;
        sortField: string;
        direction: "asc" | "desc";
    },): AppPromise<{items: IVehicle[]; count: number}>
}