import SeatModel from "./seat.model";
import SeatRepository from "./seat.repository";

import {
  CreateSeatData,
  SeatResponse,
  CreateSeat,
  SeatResponseSchema,
} from "./seat.schema";

import SecurityUtils from "../../core/security";

export default class SeatService {
  private seatRepository: SeatRepository;

  constructor(seatRepository: SeatRepository) {
    this.seatRepository = seatRepository;
  }

  async createSeat(
    data: CreateSeatData,
    clientId: string,
  ): Promise<SeatResponse> {
    const validatedData = CreateSeat.parse(data);
    const model = SeatModel.fromCreateData(validatedData, clientId);
    const createdSeat = await this.seatRepository.create(model);
    return SeatResponseSchema.parse(createdSeat);
  }

  async getAllSeats(): Promise<SeatResponse[]> {
    const seats = await this.seatRepository.getAll();
    return seats.map((seat) => SeatResponseSchema.parse(seat));
  }

  async updateSeat(
    publicId: string,
    data: Partial<CreateSeatData>,
    clientId?: string,
  ): Promise<SeatResponse> {
    const validatedData = CreateSeat.partial().parse(data);
    const updatedSeat = await this.seatRepository.update(
      publicId,
      validatedData,
      clientId,
    );
    return SeatResponseSchema.parse(updatedSeat);
  }

  async deleteSeat(publicId: string): Promise<void> {
    await this.seatRepository.delete(publicId);
  }
}
