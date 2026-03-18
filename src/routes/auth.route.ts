import { Router } from "express";
import  ClientController  from "../modules/auth/client.controller";
import  ClientService  from "../modules/auth/client.service";
import  ClientRepository  from "../modules/auth/client.repository";
import JWTservice from "../core/jwt.service";
import { db } from "../config/database";

const router = Router();

const clientRepository = new ClientRepository(db);
const jwtService = new JWTservice();
const clientService = new ClientService(clientRepository, jwtService);
const clientController = new ClientController(clientService);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar novo cliente
 *     description: Cria um novo cliente no banco de dados
 *     tags:
 *       - Auth
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
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Cliente registrado com sucesso
 */
router.post(
  "/auth/register",
  clientController.createClient.bind(clientController),
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autenticar cliente
 *     description: Autentica um cliente com email e senha, retornando um token JWT
 *     tags:
 *       - Auth
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
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida, token retornado
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/auth/login", clientController.login.bind(clientController));

export default router;
