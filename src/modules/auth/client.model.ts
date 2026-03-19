import { generateId } from "../../core/gereteId";
import { ClientCreate } from "./client.schema";

export default class ClientModel {
  id: number;
  publicId: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: number,
    publicId: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date | string,
    updatedAt: Date | string,
  ) {
    this.id = id;
    this.publicId = publicId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt =
      createdAt &&
      (typeof createdAt === "string" ? createdAt : createdAt.toISOString());
    this.updatedAt =
      updatedAt &&
      (typeof updatedAt === "string" ? updatedAt : updatedAt.toISOString());
  }

  static fromCreateData(data: ClientCreate): ClientModel {
    const now = new Date();
    return new ClientModel(
      0, // id will be set by the database
      generateId(),
      data.name,
      data.email,
      data.password,
      now.toISOString(),
      now.toISOString(),
    );
  }
}
