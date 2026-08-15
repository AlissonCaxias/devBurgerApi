import Category from "../models/Category.js";
import * as Yup from 'yup';

class CategoryController {
    // Rota para listar todas as categorias
    async index(_req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }

    // Rota para criar uma nova categoria
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json({ error: 'Validation fails', messages: error.errors });
        }

        const { name } = req.body;

        let image;
        if (req.file) {
            image = req.file.filename;
        }

        const alreadyExists = await Category.findOne({
            where: { name }
        })

        if (alreadyExists) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        const category = await Category.create({ name, image });

        return res.status(201).json(category);
    }

    // Rota para atualizar uma categoria existente
    async update(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json({ error: 'Validation fails', messages: error.errors });
        }

        const { name } = req.body;

        let image;
        if (req.file) {
            image = req.file.filename;
        }

        const alreadyExists = await Category.findOne({
            where: { name }
        })

        if (alreadyExists) {
            return res.status(400).json({ error: 'Category already exists' });
        }
        const id = await Category.findByPk(req.params.id);
        const category = await Category.update({ name, image }, { where: { id } });

        return res.status(200).json(category);
    }
}

export default new CategoryController();