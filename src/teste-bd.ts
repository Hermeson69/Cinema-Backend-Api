import postgres from "postgres";

const client = postgres(process.env.DB_URL || "");

async function test() {
  try {
    console.log("✅ Conectou com sucesso!");
    const res = await client`SELECT 1`;
    console.log(res);
  } catch (err) {
    console.error("❌ Erro:", err);
  } finally {
    await client.end();
  }
}

test();
