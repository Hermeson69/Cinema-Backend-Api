import { eq } from "drizzle-orm";
import { Clients } from "../../db/schema";
import ClientModel from "./client.model";
import { drizzle } from "drizzle-orm/postgres-js";

export default class ClientRepository {
  db: ReturnType<typeof drizzle>;

  constructor(db: ReturnType<typeof drizzle>) {
    this.db = db;
  }

  async create(client: ClientModel): Promise<ClientModel> {
    const clientData: typeof Clients.$inferInsert = {
      publicId: client.publicId,
      name: client.name,
      email: client.email,
      password: client.password,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };

    const [inserted] = await this.db
      .insert(Clients)
      .values(clientData)
      .returning();

    return new ClientModel(
      inserted.id,
      inserted.publicId,
      inserted.name,
      inserted.email,
      inserted.password,
      inserted.createdAt,
      inserted.updatedAt,
    );
  }

  async getall(): Promise<ClientModel[]> {
    const clients = await this.db.select().from(Clients);
    return clients.map(
      (client) =>
        new ClientModel(
          client.id,
          client.publicId,
          client.name,
          client.email,
          client.password,
          client.createdAt,
          client.updatedAt,
        ),
    );
  }

  async getById(id: number): Promise<ClientModel | null> {
    const [client] = await this.db
      .select()
      .from(Clients)
      .where(eq(Clients.id, id))
      .limit(1);

    if (!client) {
      return null;
    }

    return new ClientModel(
      client.id,
      client.publicId,
      client.name,
      client.email,
      client.password,
      client.createdAt,
      client.updatedAt,
    );
  }

  async getByEmail(email: string): Promise<ClientModel | null> {
    const [client] = await this.db
      .select()
      .from(Clients)
      .where(eq(Clients.email, email))
      .limit(1);

    if (!client) {
      return null;
    }

    return new ClientModel(
      client.id,
      client.publicId,
      client.name,
      client.email,
      client.password,
      client.createdAt,
      client.updatedAt,
    );
  }

  async update(client: ClientModel): Promise<ClientModel> {
    const clientData: typeof Clients.$inferInsert = {
      publicId: client.publicId,
      name: client.name,
      email: client.email,
      password: client.password,
      createdAt: client.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const [updated] = await this.db
      .update(Clients)
      .set(clientData)
      .where(eq(Clients.id, client.id))
      .returning();

    return new ClientModel(
      updated.id,
      updated.publicId,
      updated.name,
      updated.email,
      updated.password,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(Clients).where(eq(Clients.id, id));
  }
}
