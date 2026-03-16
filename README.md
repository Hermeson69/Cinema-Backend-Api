# Black Ember Coffee Backend

Backend em Node/Express com Drizzle ORM e Turso/LibSQL para o gerenciamento de clientes, pedidos, itens e pagamentos da cafeteria Black Ember.

## Stack rápida

- Runtime: Node.js (CommonJS) com `tsx` para rodar TypeScript sem build
- Framework: Express 5
- ORM: Drizzle (SQLite)
- Auth: JWT com `jsonwebtoken`, bcrypt para hash de senha, `uuidv7` para IDs
- Validação: Zod para schemas
- Clients: Mobile (React Native) e Web (React Responsivo)

## Como rodar

1. **Instale dependências**: `npm install`

2. **Configure variáveis de ambiente**: Crie um arquivo `.env` na raiz:

   ```env
   # Database
   DB_URL=file:./src/db/database.sqlite

   # JWT Configuration
   JWT_SECRET=sua_chave_secreta_super_longa_e_complexa_aqui
   JWT_EXPIRATION=7d /// quantidade de tempo desejada

   # Environment
   NODE_ENV=development
   PORT=3000
   ```

3. **Gere uma chave JWT segura**:

   ```bash
   # Gerar uma chave aleatória de 64 caracteres
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

   # Ou use uma chave personalizada (mínimo 32 caracteres)
   ```

4. **Execute as migrations**: `npm run migrate-up`
5. **(Opcional) Popule com dados iniciais**: `npm run seed`
6. **Suba o servidor**: `npm start` (roda `tsx src/server.ts`)
7. **Health check**: `GET /` responde `{ ok: true }`

## ⚙️ Configuração JWT

### Requisitos para JWT

**Dependências necessárias:**

- `jsonwebtoken`: Biblioteca para gerar e validar tokens JWT
- `@types/jsonwebtoken`: Tipos TypeScript para jsonwebtoken
- `bcrypt`: Para hash seguro de senhas
- `@types/bcrypt`: Tipos TypeScript para bcrypt

**Instalação:**

```bash
npm install jsonwebtoken @types/jsonwebtoken bcrypt @types/bcrypt
```

### Gerando Chave Secreta

**Por que precisa:** O JWT usa uma chave secreta para assinar os tokens. Sem ela, qualquer pessoa pode criar tokens falsificados.

**Métodos para gerar:**

```bash
# Método 1: Usando Node.js (recomendado)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Método 2: Usando OpenSSL (se disponível)
openssl rand -hex 32

# Método 3: Online (menos seguro para produção)
# Use geradores como: https://generate-random.org/encryption-key-generator
```

### Configuração no .env

**Exemplo de configuração:**

```env
# ⚠️ NUNCA commite o .env! Adicione ao .gitignore
JWT_SECRET=sua_chave_secreta  # 64 chars mínimo
JWT_EXPIRATION=7d     # Formatos: 1h, 24h, 7d, 30d
NODE_ENV=development
PORT=3000
DB_URL=file:./src/db/database.sqlite
```

### Validação da Configuração

**O sistema verifica automaticamente:**

- ✅ JWT_SECRET existe e tem pelo menos 32 caracteres
- ✅ JWT_EXPIRATION está no formato válido (ex: 1h, 7d, 30m)
- ❌ Aplicação falha na inicialização se configuração inválida

**Tipos de Token:**

- **CLIENT**: Para usuários mobile (clientes da cafeteria)
- **WORKER**: Para funcionários (admin, barista, garçom, barman)


### Pastas para Evolução

- `routes/`: Definição dos endpoints
- `controllers/`: Funções Express que chamam os serviços
- `services/`: Lógica de negócio
- `models/`: Tipos TypeScript e classes
- `repositories/`: Funções CRUD
- `schemas/`: Validação com Zod

## 📋 Ordem de Criação dos Arquivos

### 🎯 Por que a ordem importa?

- Evita erros de dependências circulares
- Facilita o desenvolvimento incremental
- Permite teste de cada camada isoladamente
- Reduz tempo de debug e refatoração

### 🗂️ Estrutura de Pastas Recomendada

```
src/
├── config/
│   └── enums/           # 1️⃣ Primeiro: Constantes e enums
├── db/                  # 2️⃣ Segundo: Schema e configuração do banco
├── utils/               # 3️⃣ Terceiro: Utilitários (IDs, cache, backup)
├── security/            # 4️⃣ Quarto: Hash de senhas e JWT
├── schemas/             # 5️⃣ Quinto: Validações com Zod
├── models/              # 6️⃣ Sexto: Classes e tipos TypeScript
├── repositories/        # 7️⃣ Sétimo: Camada de acesso aos dados
├── services/            # 8️⃣ Oitavo: Lógica de negócio
├── middleware/          # 9️⃣ Nono: Autenticação e validações
├── controllers/         # 🔟 Décimo: Controladores Express
├── routes/              # 1️⃣1️⃣ Décimo primeiro: Definição das rotas
└── server.ts            # 1️⃣2️⃣ Por último: Bootstrap da aplicação
```

### 🔄 Fluxo de uma Requisição

```
Cliente → Route → Middleware → Controller → Service → Repository → Database
```


## Ordem de criação dos arquivos nessa arquitetura

### Sequência Recomendada

- Fazer tudo relacionado ao banco primeiro: tabelas em `db/schema.ts`, client em `db/index.ts`
- Depois os modelos em `schemas/` (validação com Zod) e `models/` (tipos e interações com o DB)
- Depois os repositorios em `repositories/` (funções CRUD usando os modelos)
- Depois os serviços em `services/` (lógica de negócio usando os repositórios)
- Depois os controladores em `controllers/` (funções Express que chamam os serviços)
- Depois as rotas em `routes/` (definição dos endpoints que chamam os controladores)
- Finalmente, integrar as rotas no `server.ts`
- Caso necessario criar os `middlewares` de autenticação e autorização antes dos controladores

**Explicação do fluxo:**

1. **Cliente** faz requisição HTTP
2. **Route** identifica qual endpoint foi chamado
3. **Middleware** valida autenticação/autorização
4. **Controller** recebe a requisição e orquestra a resposta
5. **Service** executa a lógica de negócio
6. **Repository** acessa/modifica dados no banco
7. **Database** persiste/retorna os dados

### ⚡ Dicas de Desenvolvimento

**Desenvolvimento incremental:**

- ✅ Teste cada camada antes de passar para a próxima
- ✅ Use ferramentas como Postman para testar endpoints
- ✅ Implemente logs para debuggar o fluxo
- ✅ Valide dados em cada camada

**Evite erros comuns:**

- ❌ Não pule etapas (causa dependências quebradas)
- ❌ Não misture responsabilidades entre camadas
- ❌ Não coloque lógica de negócio nos controllers
- ❌ Não acesse o banco diretamente dos services

## Autenticação e Autorização

### Sistema de Roles para Workers

- **ADMIN**: Acesso total (registrar workers, gerenciar produtos, visualizar analytics)
- **BARISTA**: Gerenciar pedidos, preparar bebidas
- **BARMAN**: Gerenciar pedidos, preparar bebidas alcoólicas
- **WAITER**: Gerenciar pedidos, atender mesas

### Fluxo de Autenticação

1. **Cliente (Mobile)**: Login com email/password → JWT com type: `CLIENT`
2. **Worker (Web)**: Login com email/password → JWT com type: `WORKER` + role
3. **Requisições Autenticadas**: Header `Authorization: Bearer {token}`
4. **Middleware de Proteção**: Verifica token válido, tipo de usuário e role (se necessário)

### Imagens em Base64

- Produtos podem ter campo `imageBase64` com imagem codificada
- Clientes mobile recebem a imagem já em base64 na resposta JSON
- Reduz complexidade de upload de arquivos

## Variáveis de Ambiente (`.env`)

```env
# Database
DB_URL=file:./src/db/database.sqlite

# JWT Configuration
JWT_SECRET=sua_chave_secreta_gerada_com_crypto_randomBytes(32)
JWT_EXPIRATION=7d

# Environment
NODE_ENV=development
PORT=3000
```

```
Black-Amber-Coffes-backend/
├── docs/
├── src/
│   ├── controllers/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── schemas/
│   ├── seed/
│   ├── services/
│   ├── utils/
│   └── server.ts
├── .env
├── .gitignore
├── drizzle.config.ts
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## Rotas planejadas

### Autenticação (Token JWT)

- **Cliente (Mobile - React Native)**:
  - `POST /auth/client/login`: Login de cliente, retorna JWT token
  - `GET /items`: Listar produtos (público, com imagens em base64)
  - `POST /orders`: Criar pedido (autenticado como cliente)
- **Worker (Web - React Responsivo)**:
  - `POST /auth/worker/login`: Login de funcionário, retorna JWT token + role
  - Funcionalidades variam por role:
    - **ADMIN**: Pode registrar/gerenciar workers, gerenciar produtos, visualizar analytics
    - **BARISTA/BARMAN/WAITER**: Podem gerenciar pedidos

### Cliente

- `POST /clients`: Criar cliente
- `GET /clients/:id`: Obter dados do cliente (autenticado)
- `PATCH /clients/:id`: Atualizar cliente
- `DELETE /clients/:id`: Deletar cliente

### Worker (Requer ADMIN)

- `POST /workers`: Criar worker (apenas ADMIN)
- `GET /workers/:id`: Obter dados do worker
- `GET /workers`: Listar todos workers (apenas ADMIN)
- `PATCH /workers/:id`: Atualizar worker
- `DELETE /workers/:id`: Deletar worker (apenas ADMIN)

### Itens/Produtos

- `POST /items`: Criar produto (requer autenticação + validação de role)
- `GET /items`: Listar produtos (público)
- `GET /items/:id`: Obter detalhes do produto
- `PATCH /items/:id`: Atualizar produto (com suporte a imageBase64)
- `DELETE /items/:id`: Deletar produto

### Pedidos

- `POST /orders`: Criar pedido (cliente autenticado)
- `GET /orders/:id`: Obter detalhes do pedido
- `PATCH /orders/:id`: Atualizar status do pedido (worker autenticado)
- Status: `PENDING` | `IN_PROGRESS` | `COMPLETED` | `CANCELLED`

### Pagamentos

- `POST /orders/:id/payments`: Registrar pagamento
- `GET /orders/:id/payments`: Listar pagamentos do pedido

## Scripts úteis

- `npm start`: Inicia o servidor com `tsx src/server.ts`
- `npm run dev`: Inicia o servidor em modo desenvolvimento (mesmo que start)
- `npm run build`: `tsc` para gerar `dist/` (não obrigatório para rodar)
- `npm run migrate-new`: Gera nova migration via drizzle-kit
- `npm run migrate-up`: Aplica migrations
- `npm run db:delete`: Apaga o banco de dados SQLite
- `npm run db:reset`: Reseta o banco de dados (delete + migrate-up)

## Visualizar Banco de Dados

Para visualizar e gerenciar o banco SQLite, você pode usar:

- **DBeaver Community Edition**: Interface gráfica completa
- **DB Browser for SQLite**: Ferramenta específica para SQLite
- **SQLite CLI**: `sqlite3 src/db/database.sqlite`

---

## ⚠️ Projeto de Teste/Estudo

**IMPORTANTE**: Este é um projeto de estudo/teste para fins educacionais.

### Para uso em produção, considere:

1. **Validações mais robustas**:
   - Usar CPF/CNPJ ao invés de apenas email para identificação única
   - Implementar validação de telefone com formato brasileiro
   - Validar documentos com algoritmos apropriados

2. **Segurança aprimorada**:
   - Implementar rate limiting
   - Adicionar HTTPS obrigatório
   - Usar variáveis de ambiente mais seguras
   - Implementar logs de auditoria

3. **Banco de dados**:
   - Migrar para PostgreSQL ou MySQL em produção
   - Implementar backup automático
   - Configurar índices apropriados

4. **Arquitetura**:
   - Separar em microsserviços se necessário
   - Implementar cache (Redis)
   - Adicionar monitoramento e observabilidade
