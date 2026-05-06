import { Router } from 'express';
import CategoryController from '../controllers/category.controller.js';
import CategoryService from '../../application/use-cases/category.service.js';
import CategoryMongoRepository from '../../infrastructure/database/mongo/category.mongo.repository.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const repository = new CategoryMongoRepository();
const service = new CategoryService(repository);
const controller = new CategoryController(service);

const router = Router();

// Protegemos la ruta para que solo usuarios logueados creen categorías
router.use(authMiddleware);
router.post('/', controller.createCategory);

export default router;