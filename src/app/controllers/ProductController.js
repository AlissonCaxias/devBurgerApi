import Product from '../models/Products.js';
import { UniqueConstraintError } from 'sequelize';
import Yup from 'yup';

class ProductController {
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().integer().required(),
            image: Yup.string().nullable(),
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

        const { name, price, category_id } = req.body;

        try {
            const product = await Product.create({ name, price, category_id, image });

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
        const products = await Product.findAll();
        return res.status(200).json(products);
    }
}

export default new ProductController();