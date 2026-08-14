import Category from "../models/Category.js";

class CategoryController {
    async index(_req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }

    async store(req, res) {
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
}

export default new CategoryController();