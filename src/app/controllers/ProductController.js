import Product from '../models/Products.js';
import { UniqueConstraintError } from 'sequelize';
import Yup from 'yup';
import Category from '../models/Category.js';

import FormatterTemp from '../utils/formatterTemp.js';

class ProductController {
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().integer().required(),
            image: Yup.string().nullable(),
            offer: Yup.boolean().default(false), // Adicionando validação para o campo 'offer' 
        });

        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

        let image = null;
        if (req.file) {
            image = req.file.filename;
        }

        const { name, price, category_id, offer } = req.body;

        try {
            const product = await Product.create({ 
                name, 
                price,
                category_id,
                image,
                offer });

            return res.status(201).json({ product: FormatterTemp.formatData(product) });
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({
                    error: 'Produto com mesmo nome não pode ser adicionado, apenas alterado.',
                });
            }

            console.error('[ProductController.store] Erro:', error);
            return res.status(500).json({ error: 'Falha ao criar produto' });
        }
    }

       async update(req, res) {
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number().integer(),
            image: Yup.string().nullable(),
            offer: Yup.boolean().default(false), // Adicionando validação para o campo 'offer' 
        });

        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

        let image;
        if (req.file) {
            image = req.file.filename;
        }

        const { name, price, category_id, offer } = req.body;
        const { id } = req.params;

        try {
            const product = await Product.update({ 
                name, 
                price,
                category_id,
                image,
                offer }, {
                where: { id }
            });

            return res.status(201).json({ product });
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({
                    error: 'Produto com mesmo nome não pode ser adicionado, apenas alterado.',
                });
            }

            console.error('[ProductController.store] Erro:', error);
            return res.status(500).json({ error: 'Falha ao criar produto' });
        }
    }

    async index(_req, res) {
        const products = await Product.findAll({
            include:
            {
                model: Category,
                as: 'category',
                attributes: ['name']
            },

        });
        return res.status(200).json(products.map(p => FormatterTemp.formatData(p)));
    }
}

export default new ProductController();