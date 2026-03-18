import { db } from "../config/database";
import { Clients } from "../db/schema";
import SecurityUtils from "../core/security";
import { uuidv7 } from "uuidv7";

export async function seed() {
  console.log("🌱 Iniciando seed...");

  try {
    // Verificar se seed já foi executada
    const existingClients = await db.select().from(Clients).limit(1);

    if (existingClients.length > 0) {
      console.log("⏭️  Seed já foi executada, pulando...");
      return;
    }

    // 1. Hash de senha padrão
    console.log("🔐 Criptografando senhas...");
    const hashedPassword = await SecurityUtils.hashPassword("123456");

    // 2. Criar clientes
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

    console.log("✅ Seed concluída com sucesso!");
    console.log("\n📧 Credenciais de teste:");
    console.log("   joao@cinema.com / 123456");
    console.log("   maria@cinema.com / 123456");
    console.log("   pedro@cinema.com / 123456");
  } catch (error) {
    console.error("❌ Erro na seed:", error);
  }
}
