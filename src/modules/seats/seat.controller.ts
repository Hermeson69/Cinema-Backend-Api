import SeatService from "./seat.service";
import {
  CreateSeatData,
  SeatResponse,
  CreateSeat,
  SeatResponseSchema,
} from "./seat.schema";
import { Request, Response } from "express";

export default class SeatController {
  private seatService: SeatService;

  constructor(seatService: SeatService) {
    this.seatService = seatService;
  }

  async createSeat(req: Request, res: Response): Promise<void> {
    try {
      const clientId = req.headers["x-client-id"] as string;
      if (!clientId) {
        res
          .status(400)
          .json({ error: "Client ID is required in x-client-id header" });
        return;
      }
      const data: CreateSeatData = req.body;
      const seatResponse: SeatResponse = await this.seatService.createSeat(
        data,
        clientId,
      );
      res.status(201).json(seatResponse);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAllSeats(req: Request, res: Response): Promise<void> {
    try {
      const seats: SeatResponse[] = await this.seatService.getAllSeats();
      res.status(200).json(seats);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateSeat(req: Request, res: Response): Promise<void> {
    try {
      const publicId = req.params.publicId;
      const data: Partial<CreateSeatData> = req.body;
      const clientId = req.headers["x-client-id"] as string | undefined;
      const seatResponse: SeatResponse = await this.seatService.updateSeat(
        publicId,
        data,
        clientId,
      );
      res.status(200).json(seatResponse);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteSeat(req: Request, res: Response): Promise<void> {
    try {
      const publicId = req.params.publicId;
      await this.seatService.deleteSeat(publicId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
