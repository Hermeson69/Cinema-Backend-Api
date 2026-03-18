import { pgTable, serial, text, numeric } from "drizzle-orm/pg-core";


export const Clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  publicId: text("public_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text().notNull(),
  updatedAt: text().notNull(),
  deletedAt: text(),
});

export const Seets = pgTable("seets", {
    id: serial("id").primaryKey(),
    clientId: text("client_id").notNull(),
    seat_number: text("seat_number").notNull(),
    row: text("row").notNull(),
    number: numeric("number").notNull(),
    category: text("category").notNull(),
    status: text("status").notNull(),
    createdAt: text().notNull(),
    updatedAt: text().notNull(),
});
