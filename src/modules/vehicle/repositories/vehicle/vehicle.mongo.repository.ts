import {MongoRepository} from "../../../../config/db/repository/mongo.repository.ts";
import { type IVehicle, Vehicle } from "../../../../config/db/schemas/vehicle.schema.ts";
import type { AppPromise } from "../../../../lib/types/app-result.ts";
import { Success } from "../../../../lib/utils/result/success.ts";
import type {IVehicleRepository} from "./vehicle.repository.interface.ts";

class VehicleMongoRepository extends MongoRepository<IVehicle> implements IVehicleRepository {
    constructor() {
        super(Vehicle)
    }

    async createVehicle(): AppPromise<IVehicle> {
        throw new Error("Method not implemented.");
    }
    async findAllVehiclesPageable(query: Partial<IVehicle>, sortAndPageable: { offset: number; limit: number; sortField: string; direction: "asc" | "desc"; }): AppPromise<{ items: IVehicle[]; count: number; }> {
        const [tasks, count] = await Promise.all([
            this.model
                .find(query)
                .sort({
                    [sortAndPageable.sortField]:
                        sortAndPageable.direction === "asc" ? -1 : 1,
                })
                .skip(sortAndPageable.offset || 0)
                .limit(sortAndPageable.limit || 10),
            this.model.countDocuments(query),
        ]);

        return Success.create({
            items: tasks,
            count,
        });
    }
}

export default new VehicleMongoRepository()