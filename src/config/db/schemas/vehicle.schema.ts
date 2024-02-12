import mongoose from "mongoose";
import {VehicleType} from "../../../modules/vehicle/enum/vehicle-type.enum.ts";
import {VehicleStatus} from "../../../modules/vehicle/enum/vehicle-status.enum.ts";

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  vehicleNumber: { type: String, required: true, unique: true },
  vehicleName: { type: String, required: true },
  type: {
    type: String,
    enum: Object.values(VehicleType),
    required: true,
  },
  currentChargeLevel: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(VehicleStatus),
    default: VehicleStatus.Stopped,
  },
}, {
  timestamps: true,
});

export type IVehicle = {
  _id: string;
  vehicleNumber: string;
  vehicleName: string;
  type: string;
  currentChargeLevel: number;
  status: string;
} & mongoose.Document["_id"];

type VehicleDocument = IVehicle & mongoose.Document;

export const Vehicle = mongoose.model<VehicleDocument>("Vehicle", VehicleSchema);
