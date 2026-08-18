const fs = require('node:fs');

let dbPassword;
try {
	dbPassword = fs.readFileSync('/run/secrets/db-password', 'utf8').trim();
} catch (err) {
	// Se não encontrar o arquivo, usa uma senha padrão para teste
	dbPassword = fs.readFileSync('./db/password.txt', 'utf8').trim() || '123456' || err.message;
}

module.exports = {
	dialect: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || 5432,
	username: process.env.DB_USER || 'admin',
	password: dbPassword,
	database: process.env.DB_NAME || 'dev-burger-db',
	define: { timestamps: true, underscored: true, underscoredAll: true },
};
