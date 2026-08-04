
async function adminMiddleware(req, res, next) {
	const userIsAdmin = req.userAdmin;

	if (!userIsAdmin) {
		return res.status(401).json({ error: 'Não autorizado' });
	}
		return next();
	}


export default adminMiddleware;
