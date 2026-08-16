import { Router } from 'express';

import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
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
//rotas para produtos
router.post('/products', adminMiddleware, upload.single('image'), ProductController.store);
router.put('/products/:id', adminMiddleware, upload.single('image'), ProductController.update);
router.get('/products', ProductController.index);

//rotas para usuários
router.get('/users', UserController.index);
//rotas para categorias
router.post('/categories', adminMiddleware, upload.single('image'), CategoryController.store);
router.put('/categories/:id', adminMiddleware, upload.single('image'), CategoryController.update);
router.get('/categories', CategoryController.index);

//routers para pedidos
router.post('/orders', OrderController.storeOrder); //rotas pra criar pedidos
//router.get('/orders', OrderController.indexOrder); //rotas pra listar pedidos
//router.get('/orders/:id', OrderController.showOrder); //rotas pra mostrar detalhes de um pedido específico
//router.put('/orders/:id', OrderController.updateOrder); //rotas pra atualizar um pedido
//router.delete('/orders/:id', OrderController.deleteOrder); //rotas pra deletar um pedido

export default router;