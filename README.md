# Cinema Backend API

API backend para gerenciamento de clientes e assentos de um sistema de cinema.

Resumo rápido

- Node.js + TypeScript (CommonJS)
- Express 5
- Drizzle ORM (migrations com `drizzle-kit`)
- Validação: Zod
- Autenticação: JWT + bcrypt

Instalação

1. Instale dependências:

   npm install

2. Crie um arquivo `.env` na raiz com as variáveis mínimas:

   DB_URL=postgres://user:pass@localhost:5432/dbname
   JWT_SECRET=uma_chave_secreta_segura
   JWT_EXPIRATION=7d
   NODE_ENV=development
   PORT=3000

Scripts úteis

- `npm start` — Executa `tsx src/server.ts` (inicia servidor)
- `npm run build` — `tsc` (compila TypeScript)
- `npm run migrate-new` — Gera migration com `drizzle-kit generate`
- `npm run migrate-up` — Aplica migrations (drizzle-kit migrate)
- `npm run db:delete` — Remove arquivo SQLite (caso você use SQLite local)
- `npm run db:reset` — Remove DB SQLite e reaplica migrations

Migrations & Seed

- Use `npm run migrate-new` para gerar migrations a partir de `src/db/schema.ts`.
- Use `npm run migrate-up` para aplicar migrations no banco configurado em `DB_URL`.
- O projeto contém um seed em `src/seed/seed.ts` que cria clientes e assentos na primeira execução.

Como rodar localmente

1. Configure `.env` (veja acima).
2. Rode migrations: `npm run migrate-up`.
3. Inicie a aplicação: `npm start`.

Endpoints principais

- `GET /api/seats` — Lista todos os assentos
- `POST /api/seats` — Cria um assento
- `PUT /api/seats/:publicId` — Atualiza um assento (opcional header `x-client-id` para atrelar cliente)
- `DELETE /api/seats/:publicId` — Deleta um assento
- `POST /auth/client/login` — Login de cliente
- `POST /clients` — Criar cliente
- `DELETE /clients/:id` — Deletar cliente (remoção literal)

Observações importantes

- O schema das tabelas está em `src/db/schema.ts` — altere com cuidado e gere migrations.
- Validações de entrada usam Zod em `src/modules/*/*.schema.ts`.
- O seed cria dados iniciais apenas na primeira execução (clientes/assentos).

Contribuição

- Abra uma issue descrevendo o problema ou feature.
- Faça um branch com mudanças claras e um PR com descrição e testes quando aplicável.

Contato

- Repositório: este projeto

---