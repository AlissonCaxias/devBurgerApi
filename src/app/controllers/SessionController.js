import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const EmailorPasswordIncorrect = () => res.status(401).json({ error: 'Email ou Senha inválidos' });

        const user = await User.findOne({ where: { email } });
        if (!user) {
            EmailorPasswordIncorrect();
        }

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
            EmailorPasswordIncorrect();
        }

        const { id, name, admin } = user;

        const token = jwt.sign(
            { id, admin },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        return res.json({
            user: { id, name, email, admin },
            token,
        });
    }
}

export default new SessionController();