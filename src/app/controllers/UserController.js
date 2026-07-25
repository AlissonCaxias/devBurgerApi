import User from '../models/User.js';

import { v4 as uuidv4 } from 'uuid';

class UserController {
	async store(req, res) {
		const { name, email, password_hash, admin } = req.body;

		const userAlreadyExists = await User.findOne({
			where: { email },
		});

		if (userAlreadyExists) {
			return res.status(400).json({
				error: 'Usuário já cadastrado!',
			});
		}

		try {
			await User.create({
				id: uuidv4(),
				name,
				email,
				password_hash,
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
}
export default new UserController();

