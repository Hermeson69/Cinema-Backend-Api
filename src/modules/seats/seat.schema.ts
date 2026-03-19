import * as z from "zod";

export const CreateSeat = z.object({
  seat_number: z.string().min(1),
  row: z.string().min(1),
  number: z.number().int().positive(),
  category: z.string().min(1),
  status: z.enum(["available", "reserved", "occupied"]),
});

export const UpdateSeat = z.object({
  seat_number: z.string().min(1).optional(),
  row: z.string().min(1).optional(),
  number: z.number().int().positive().optional(),
  category: z.string().min(1).optional(),
  status: z.enum(["available", "reserved", "occupied"]).optional(),
});

export const SeatResponseSchema = z.object({
  publicId: z.string(),
  clientId: z.string().nullable().optional(),
  seat_number: z.string(),
  row: z.string(),
  number: z.number(),
  category: z.string(),
  status: z.enum(["available", "reserved", "occupied"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreateSeatData = z.infer<typeof CreateSeat>;
export type UpdateSeatData = z.infer<typeof UpdateSeat>;
export type SeatResponse = z.infer<typeof SeatResponseSchema>;
