import { Router } from 'express';

import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import authMiddleware from './app/middlewares/auth.js';

const router = new Router();

// Rotas públicas (não exigem token)
router.post('/users', UserController.store);
router.post('/login', SessionController.store);

// A partir daqui, todas as rotas exigem token JWT válido
router.use(authMiddleware);

router.get('/users', UserController.index);

export default router;