import { generateId } from "../../core/gereteId";
import { CreateSeatData } from "./seat.schema";

export default class SeatModel {
  id: number;
  publicId: string;
  clientId: string | null | undefined;
  seat_number: string;
  row: string;
  number: number;
  category: string;
  status: "available" | "reserved" | "occupied";
  createdAt: string;
  updatedAt: string;

  constructor(
    id: number,
    publicId: string,
    clientId: string | null | undefined,
    seat_number: string,
    row: string,
    number: number,
    category: string,
    status: "available" | "reserved" | "occupied",
    createdAt: Date | string,
    updatedAt: Date | string,
  ) {
    this.id = id;
    this.publicId = publicId;
    this.clientId = clientId;
    this.seat_number = seat_number;
    this.row = row;
    this.number = number;
    this.category = category;
    this.status = status;
    this.createdAt =
      createdAt &&
      (typeof createdAt === "string" ? createdAt : createdAt.toISOString());
    this.updatedAt =
      updatedAt &&
      (typeof updatedAt === "string" ? updatedAt : updatedAt.toISOString());
  }

  static fromCreateData(data: CreateSeatData, clientId: string): SeatModel {
    const now = new Date();
    return new SeatModel(
      0, // id will be set by the database
      generateId(),
      clientId,
      data.seat_number,
      data.row,
      data.number,
      data.category,
      data.status,
      now.toISOString(),
      now.toISOString(),
    );
  }
}
