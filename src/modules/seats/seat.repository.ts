import { eq } from "drizzle-orm";
import { Seets } from "../../db/schema";
import SeatModel from "./seat.model";
import { drizzle } from "drizzle-orm/postgres-js";
import { generateId } from "../../core/gereteId";

export default class SeatRepository {
  db: ReturnType<typeof drizzle>;

  constructor(db: ReturnType<typeof drizzle>) {
    this.db = db;
  }

  async create(seat: SeatModel): Promise<SeatModel> {
    const seatData: typeof Seets.$inferInsert = {
      clientId: seat.clientId,
      seat_number: seat.seat_number,
      row: seat.row,
      number: seat.number.toString(),
      category: seat.category,
      status: seat.status,
      createdAt: seat.createdAt,
      updatedAt: seat.updatedAt,
    };

    const [inserted] = await this.db.insert(Seets).values(seatData).returning();

    return new SeatModel(
      inserted.id,
      `seat-${inserted.id}`, // Gera um publicId baseado no ID
      inserted.clientId || undefined,
      inserted.seat_number,
      inserted.row,
      typeof inserted.number === "string"
        ? parseInt(inserted.number)
        : inserted.number,
      inserted.category,
      inserted.status as "available" | "reserved" | "occupied",
      inserted.createdAt,
      inserted.updatedAt,
    );
  }

  async getAll(): Promise<SeatModel[]> {
    const seats = await this.db.select().from(Seets);
    return seats.map(
      (seat) =>
        new SeatModel(
          seat.id,
          `seat-${seat.id}`, // Gera um publicId baseado no ID
          seat.clientId || undefined,
          seat.seat_number,
          seat.row,
          typeof seat.number === "string" ? parseInt(seat.number) : seat.number,
          seat.category,
          seat.status as "available" | "reserved" | "occupied",
          seat.createdAt,
          seat.updatedAt,
        ),
    );
  }

  async update(
    publicId: string,
    data: Partial<SeatModel>,
    clientId?: string,
  ): Promise<SeatModel> {
    const id = parseInt(publicId.replace("seat-", ""));
    const updateData: Partial<typeof Seets.$inferInsert> = {
      seat_number: data.seat_number,
      row: data.row,
      number: data.number ? data.number.toString() : undefined,
      category: data.category,
      status: data.status,
      clientId: clientId || undefined,
      updatedAt: new Date().toISOString(),
    };

    const [updated] = await this.db
      .update(Seets)
      .set(updateData)
      .where(eq(Seets.id, id))
      .returning();

    if (!updated) {
      throw new Error("Seat not found");
    }

    return new SeatModel(
      updated.id,
      `seat-${updated.id}`, // Gera um publicId baseado no ID
      updated.clientId || undefined,
      updated.seat_number,
      updated.row,
      typeof updated.number === "string"
        ? parseInt(updated.number)
        : updated.number,
      updated.category,
      updated.status as "available" | "reserved" | "occupied",
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(publicId: string): Promise<void> {
    const id = parseInt(publicId.replace("seat-", ""));
    await this.db.delete(Seets).where(eq(Seets.id, id));
  }
}
