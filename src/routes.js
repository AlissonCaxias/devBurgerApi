import { Router } from 'express';

import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import authMiddleware from './app/middlewares/auth.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import adminMiddleware from './app/middlewares/admin.js';

const router = new Router();

const upload = multer(multerConfig);

// Rotas públicas (não exigem token)
router.post('/users', UserController.store);
router.post('/login', SessionController.store);


// A partir daqui, todas as rotas exigem token JWT válido
router.use(authMiddleware);

router.post('/products', adminMiddleware, upload.single('image'), ProductController.store);
router.get('/users', UserController.index);
router.get('/products', ProductController.index);
router.post('/categories', adminMiddleware, upload.single('image'), CategoryController.store);
router.get('/categories', CategoryController.index);

export default router;