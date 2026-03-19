import { Router } from "express";
import SeatController from "../modules/seats/seat.controller";
import SeatService from "../modules/seats/seat.service";
import SeatRepository from "../modules/seats/seat.repository";
import { db } from "../config/database";

const router = Router();

const seatRepository = new SeatRepository(db);
const seatService = new SeatService(seatRepository);
const seatController = new SeatController(seatService);

// ============================================
// GET - Recuperar Dados
// ============================================

/**
 * @swagger
 * /api/seats:
 *   get:
 *     summary: Listar todos os assentos
 *     description: Retorna uma lista de todos os assentos disponíveis
 *     tags:
 *       - Seats
 *     responses:
 *       200:
 *         description: Lista de assentos retornada com sucesso
 */
router.get("/seats", seatController.getAllSeats.bind(seatController));

// ============================================
// POST - Criar Dados
// ============================================

/**
 * @swagger
 * /api/seats:
 *   post:
 *     summary: Criar um novo assento
 *     description: Cria um novo assento com os dados fornecidos
 *     tags:
 *       - Seats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSeatData'
 *     responses:
 *       201:
 *         description: Assento criado com sucesso
 */
router.post("/seats", seatController.createSeat.bind(seatController));

// ============================================
// PUT - Atualizar Dados
// ============================================

/**
 * @swagger
 * /api/seats/{publicId}:
 *   put:
 *     summary: Atualizar um assento existente
 *     description: Atualiza os dados de um assento existente com base no publicId. Opcionalmente pode atrelar um cliente ao assento usando o header x-client-id
 *     tags:
 *       - Seats
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID público do assento a ser atualizado
 *       - in: header
 *         name: x-client-id
 *         required: false
 *         schema:
 *           type: string
 *         description: ID do cliente para atrelar ao assento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seat_number:
 *                 type: string
 *               row:
 *                 type: string
 *               number:
 *                 type: number
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [available, reserved, occupied]
 *           examples:
 *             application/json:
 *               value:
 *                 status: reserved
 *     responses:
 *       200:
 *         description: Assento atualizado com sucesso
 */
router.put("/seats/:publicId", seatController.updateSeat.bind(seatController));

// ============================================
// DELETE - Remover Dados
// ============================================

/**
 * @swagger
 * /api/seats/{publicId}:
 *   delete:
 *     summary: Deletar um assento existente
 *     description: Remove um assento existente com base no publicId
 *     tags:
 *       - Seats
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID público do assento a ser deletado
 *     responses:
 *       204:
 *         description: Assento deletado com sucesso
 */
router.delete(
  "/seats/:publicId",
  seatController.deleteSeat.bind(seatController),
);

export default router;
