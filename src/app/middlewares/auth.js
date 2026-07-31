import jwt from 'jsonwebtoken';

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' '); // formato: "Bearer <token>"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userAdmin = decoded.admin;
        req.productId = decoded.productId;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}

export default authMiddleware;