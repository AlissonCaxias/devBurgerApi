import { Router } from 'express';

import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import authMiddleware from './app/middlewares/auth.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';

const router = new Router();

const upload = multer(multerConfig);

// Rotas públicas (não exigem token)
router.post('/users', UserController.store);
router.post('/login', SessionController.store);
router.post('/products',upload.single('image'), ProductController.store);
router.get('/products', ProductController.index);

// A partir daqui, todas as rotas exigem token JWT válido
router.use(authMiddleware);

router.get('/users', UserController.index);
/*router.get('/products', ProductController.index);*/

export default router;