import Order from '../../app/schemas/orders.js';
import Yup from 'yup';
import Product from '../models/Products.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import FormatterTemp from '../utils/formatterTemp.js';

class OrderController {
    async storeOrder(req, res) {
        // Espera receber: { products: [{ id: 1, quantity: 2 }, { id: 3, quantity: 1 }] }
        const schema = Yup.object({
            products: Yup.array()
                .of(
                    Yup.object({
                        id: Yup.number().integer().required(),
                        quantity: Yup.number().integer().min(1).required(),
                    })
                )
                .min(1, 'O pedido precisa ter ao menos um produto')
                .required(),
        });

        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json({ error: error.errors });
        }
        const { userId } = req;
        const { products } = req.body;

        try {
            // Busca o usuário logado (req.userId vem do authMiddleware/JWT)
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado.' });
            }

            // Busca os produtos no Postgres para montar o snapshot do pedido no Mongo
            const productIds = products.map((p) => p.id);

            const foundProducts = await Product.findAll({
                where: { id: productIds },
                include: {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                },
            });

            if (foundProducts.length !== productIds.length) {
                return res.status(400).json({ error: 'Um ou mais produtos não foram encontrados.' });
            }

            const orderProducts = foundProducts.map((product) => {
                const item = products.find((p) => p.id === product.id);

                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category ? product.category.name : null,
                    quantity: item.quantity,
                    url: product.url,
                };
            });

            const order = await Order.create({
                user: { id: userId },
                name: user.name,
                products: orderProducts,
                status: 'Pedido realizado',
            });

            return res.status(201).json(FormatterTemp.formatData(order));
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message });
            }

            console.error('[OrderController.storeOrder] Erro:', error);
            return res.status(500).json({ error: 'Falha ao criar pedido' });
        }
    }

    async updateOrder(req, res) {
        const schema = Yup.object({
            products: Yup.array()
                .of(
                    Yup.object({
                        id: Yup.number().integer().required(),
                        quantity: Yup.number().integer().min(1).required(),
                    })
                )
                .min(1, 'O pedido precisa ter ao menos um produto')
                .required(),
        });

        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json({ error: error.errors });
        }

        // A rota é '/orders/:id', então o parâmetro chega como req.params.id
        const { id } = req.params;
        const { products } = req.body;

        try {
            // Order é um model Mongoose (não Sequelize): o método certo é findById, não findByPk
            const order = await Order.findById(id);

            if (!order) {
                return res.status(404).json({ error: 'Pedido não encontrado.' });
            }

            // Busca os produtos no Postgres para montar o snapshot do pedido no Mongo
            const productIds = products.map((p) => p.id);

            const foundProducts = await Product.findAll({
                where: { id: productIds },
                include: {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                },
            });

            if (foundProducts.length !== productIds.length) {
                return res.status(400).json({ error: 'Um ou mais produtos não foram encontrados.' });
            }

            const orderProducts = foundProducts.map((product) => {
                const item = products.find((p) => p.id === product.id);

                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category ? product.category.name : null,
                    quantity: item.quantity,
                    url: product.url,
                };
            });

            order.products = orderProducts;
            await order.save();

            return res.status(200).json(FormatterTemp.formatData(order));
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message });
            }

            // ID em formato inválido para o Mongo (não é um ObjectId válido)
            if (error.name === 'CastError') {
                return res.status(400).json({ error: 'ID de pedido inválido.' });
            }

            console.error('[OrderController.updateOrder] Erro:', error);
            return res.status(500).json({ error: 'Falha ao atualizar pedido' });
        }
    }

    async indexOrder(req, res) {
        try {
            // Admin vê todos os pedidos; usuário comum vê só os próprios
            const filter = req.userAdmin ? {} : { 'user.id': req.userId };

            const orders = await Order.find(filter).sort({ createdAt: -1 });

            return res.status(200).json(orders.map((order) => FormatterTemp.formatData(order)));
        } catch (error) {
            console.error('[OrderController.indexOrder] Erro:', error);
            return res.status(500).json({ error: 'Falha ao listar pedidos' });
        }
    }
}

export default new OrderController();