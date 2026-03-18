import { Router } from "express";
import { ClinetsController } from "../controllers";
import { ClientService, JWTservice } from "../services";
import { ClientRepository } from "../repositories";
import { db } from "../db";
import { AuthMiddleware } from "../middleware";

const router = Router();

const clientRepository = new ClientRepository(db);
const jwtService = new JWTservice();
const clientService = new ClientService(clientRepository, jwtService);
const clientController = new ClinetsController(clientService);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Criar um novo cliente
 *     description: Cria um novo cliente no banco de dados
 *     tags:
 *       - Clients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
router.post("/clients", clientController.createClient.bind(clientController));

/**
 * @swagger
 * /api/clients/login:
 *   post:
 *     summary: Autenticar um cliente
 *     description: Autentica um cliente com email e senha
 *     tags:
 *       - Clients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente autenticado com sucesso
 */
router.post(
  "/clients/login",
  clientController.loginClient.bind(clientController),
);

/**
 * @ swagger
 * /api/clients/{email}:
 *   get:
 *     summary: Obter cliente por email
 *     description: Retorna os detalhes do cliente com base no email fornecido
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email do cliente
 *     responses:
 *       200:
 *         description: Detalhes do cliente retornados com sucesso

 * router.get(
  "/clients/:email",
  clientController.getclientByEmail.bind(clientController),
);
*/

/**
 * @swagger
 * /api/clients/profile/{id}:
 *   get:
 *     summary: Obter perfil do cliente por ID
 *     description: Retorna os detalhes do perfil do cliente com base no ID fornecido
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Detalhes do perfil do cliente retornados com sucesso
 */
router.get(
  "/clients/profile/:id",
  AuthMiddleware,
  clientController.getProfile.bind(clientController),
);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Obter todos os clientes apenas para adms
 *     description: Retorna uma lista de todos os clientes
 *     tags:
 *       - Clients
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 */
router.get("/clients", clientController.getAllClients.bind(clientController));

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Atualizar cliente
 *     description: Atualiza os detalhes do cliente com base no ID fornecido
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 */
router.put(
  "/clients/:id",
  AuthMiddleware,
  clientController.updateClient.bind(clientController),
);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Deletar cliente
 *     description: Deleta o cliente com base no ID fornecido
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 */
router.delete(
  "/clients/:id",
  AuthMiddleware,
  clientController.deleteClient.bind(clientController),
);

export default router;