import { db } from "../config/database";
import { Clients, Seets } from "../db/schema";
import SecurityUtils from "../core/security";
import { uuidv7 } from "uuidv7";

export async function seed() {
  console.log("🌱 Iniciando seed...");

  try {
    // 1. Verificar e criar clientes
    const existingClients = await db.select().from(Clients).limit(1);

    if (existingClients.length === 0) {
      console.log("🔐 Criptografando senhas...");
      const hashedPassword = await SecurityUtils.hashPassword("123456");

      console.log("👤 Criando clientes...");

      await db.insert(Clients).values({
        publicId: uuidv7(),
        name: "João Silva",
        email: "joao@cinema.com",
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await db.insert(Clients).values({
        publicId: uuidv7(),
        name: "Maria Santos",
        email: "maria@cinema.com",
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await db.insert(Clients).values({
        publicId: uuidv7(),
        name: "Pedro Oliveira",
        email: "pedro@cinema.com",
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log("✅ Clientes criados com sucesso!");
      console.log("\n📧 Credenciais de teste:");
      console.log("   joao@cinema.com / 123456");
      console.log("   maria@cinema.com / 123456");
      console.log("   pedro@cinema.com / 123456");
    } else {
      console.log("⏭️  Clientes já foram seeded, pulando...");
    }

    // 2. Verificar e criar assentos
    console.log("🪑 Verificando assentos...");
    const existingSeats = await db.select().from(Seets).limit(1);

    if (existingSeats.length === 0) {
      console.log("🪑 Criando assentos...");
      const rows = ["A", "B", "C", "D", "E"];
      const seatsPerRow = 10;

      for (const row of rows) {
        for (let i = 1; i <= seatsPerRow; i++) {
          await db.insert(Seets).values({
            clientId: null,
            seat_number: `${row}${i}`,
            row: row,
            number: i.toString(),
            category: row === "A" ? "VIP" : "Normal",
            status: "available",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      }

      console.log("✅ Assentos criados: 50 (5 linhas x 10 assentos)");
    } else {
      console.log("⏭️  Assentos já foram seeded, pulando...");
    }

    console.log("\n✅ Seed finalizada!");
  } catch (error) {
    console.error("❌ Erro na seed:", error);
  }
}
