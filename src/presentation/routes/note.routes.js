import { Router } from "express";
import NoteController from "../controllers/note.controller.js";
import NoteService from "../../application/use-cases/note.service.js";
import upload from "../middlewares/upload.middleware.js";

// Importación de middlewares de seguridad
import { authMiddleware } from "../middlewares/auth.middleware.js"; 
import { roleMiddleware } from "../middlewares/role.middleware.js";

import NoteMongoRepository from "../../infrastructure/database/mongo/note.mongo.repository.js";

// Inyeccion de dependencias
const noteRepository = new NoteMongoRepository();
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Gestión de notas del sistema
 */

// Middleware que protege TODAS las rutas de abajo (exige Token JWT)
router.use(authMiddleware);

/**
 * @swagger
 * /api/v1/notes:
 *   post:
 *     summary: Crear una nueva nota con imagen
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Nota creada exitosamente
 *       401:
 *         description: No autorizado (Token inválido o faltante)
 */
router.post("/", upload.single('image'), noteController.createNote);

/**
 * @swagger
 * /api/v1/notes:
 *   get:
 *     summary: Obtener todas las notas del usuario autenticado
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas obtenida con éxito
 *       401:
 *         description: No autorizado
 */
router.get("/", noteController.getNotesByUserId);

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   put:
 *     summary: Actualizar una nota existente
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la nota a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nota actualizada
 *       401:
 *         description: No autorizado
 */
router.put("/:id", noteController.updateNote);

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   delete:
 *     summary: Eliminar una nota (Exclusivo para Administradores)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la nota a eliminar
 *     responses:
 *       200:
 *         description: Nota eliminada correctamente
 *       401:
 *         description: No autorizado (Falta JWT)
 *       403:
 *         description: Prohibido (No tienes rol de admin)
 */
// Ruta protegida específicamente por ROL (solo 'admin' puede borrar)
router.delete("/:id", roleMiddleware(['admin']), noteController.deleteNote);

export default router;