import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const EmailorPasswordIncorrect = () =>
            res.status(401).json({ error: "Email ou Senha inválidos" });

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return EmailorPasswordIncorrect();
            }

            const isValid = await bcrypt.compare(password, user.password_hash);
            if (!isValid) {
                return EmailorPasswordIncorrect();
            }

            const token = jwt.sign({ id: user.id, admin: user.admin }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN || "1d",
            });

            return res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    admin: user.admin,
                },
                token,
            });
        } catch (error) {
            // error.original/error.parent guardam a mensagem real do driver do Postgres
            console.error('[SessionController.store] Erro:', error.message);
            console.error('[SessionController.store] Detalhe original:', error.original?.message || error.parent?.message || 'sem detalhe adicional');
            return res.status(500).json({ error: 'Falha ao realizar login' });
        }
    }
}

export default new SessionController();