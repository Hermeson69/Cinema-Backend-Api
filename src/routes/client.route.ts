import { Router } from "express";
import  ClientController  from "../modules/auth/client.controller";
import  ClientService  from "../modules/auth/client.service";
import  ClientRepository  from "../modules/auth/client.repository";
import JWTservice from "../core/jwt.service";
import { db } from "../config/database";
import { AuthMiddleware } from "../modules/auth/auth.middleware";

const router = Router();

const clientRepository = new ClientRepository(db);
const jwtService = new JWTservice();
const clientService = new ClientService(clientRepository, jwtService);
const clientController = new ClientController(clientService);

// ============================================
// GET - Recuperar Dados
// ============================================

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Listar todos os clientes
 *     description: Retorna uma lista de todos os clientes (apenas para administradores)
 *     tags:
 *       - Clients
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/clients", clientController.getAllClients.bind(clientController));

/**
 * @swagger
 * /api/clients/profile/{id}:
 *   get:
 *     summary: Obter perfil do cliente
 *     description: Retorna os detalhes do perfil do cliente autenticado
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do cliente retornado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 */
router.get(
  "/clients/profile/:id",
  AuthMiddleware,
  clientController.getClientById.bind(clientController),
);

// ============================================
// PUT - Atualizar Dados
// ============================================

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Atualizar dados do cliente
 *     description: Atualiza as informações de um cliente específico
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 */
router.put(
  "/clients/:id",
  AuthMiddleware,
  clientController.updateClient.bind(clientController),
);

// ============================================
// DELETE - Remover Dados
// ============================================

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Deletar cliente
 *     description: Remove um cliente específico do banco de dados
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 */
router.delete(
  "/clients/:id",
  AuthMiddleware,
  clientController.deleteClient.bind(clientController),
);

export default router;
