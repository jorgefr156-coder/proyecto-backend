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

// ==========================================
// EJERCICIO 3: RUTA PÚBLICA
// ¡DEBE IR AQUÍ ARRIBA PARA NO PEDIR TOKEN!
// ==========================================
router.get("/:id/public", noteController.getPublicNote);


// ==========================================
// MIDDLEWARE DE SEGURIDAD GLOBAL
// Protege TODAS las rutas que están debajo de esta línea
// ==========================================
router.use(authMiddleware);


// ==========================================
// RUTAS PRIVADAS (Requieren Token)
// ==========================================
router.post("/", upload.single('image'), noteController.createNote);

router.get("/", noteController.getNotesByUserId);

router.put("/:id", noteController.updateNote);

// Ruta protegida específicamente por ROL (solo 'admin' puede borrar)
router.delete("/:id", roleMiddleware(['admin']), noteController.deleteNote);

export default router;