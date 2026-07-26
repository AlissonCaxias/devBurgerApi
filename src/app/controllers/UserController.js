import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

class UserController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string()
				.test('no-numbers', 'O nome não pode conter números', (value) => {
					if (!value) return true;
					return !/\d/.test(value);
				})
				.required(),
			email: Yup.string().email().required(),
			password: Yup.string().required().min(6), // 👈 recebe "password", não "password_hash"
			admin: Yup.boolean(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false });
		} catch (error) {
			return res.status(400).json({
				error: error.message,
			});
		}

		const { name, email, password, admin } = req.body; // 👈 recebe a senha crua do client

		const userAlreadyExists = await User.findOne({
			where: { email },
		});
		if (userAlreadyExists) {
			return res.status(400).json({
				error: 'E-mail já cadastrado!',
			});
		}

		try {
			const password_hash = await bcrypt.hash(password, 10); // 👈 gera o hash aqui

			await User.create({
				id: uuidv4(),
				name,
				email,
				password_hash, // 👈 agora salva o hash de verdade
				admin,
			});

			return res.status(201).json({
				message: 'Usuário cadastrado com sucesso!',
				user: {
					name,
					email,
					admin,
				},
			});
		} catch (error) {
			console.error('[UserController.store] Erro:', error);
			return res.status(500).json({
				error: 'Falha ao cadastrar usuário',
			});
		}
	}

	async index(req, res) {
		const users = await User.findAll();

		if (!users || users.length === 0) {
			return res.status(200).json([]);
		}

		const formattedUsers = users.map(user => ({
			id: user.id,
			name: user.name,
			email: user.email,
			admin: user.admin,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		}));

		return res.status(200).json(formattedUsers);
	}
}

export default new UserController();