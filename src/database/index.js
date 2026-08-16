import Mongoose from "mongoose";
import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.cjs'; // 👈 importa o config
import User from '../app/models/User.js'; // 👈 importa o User
import Product from '../app/models/Products.js'; // 👈 importa o Product
import Category from '../app/models/Category.js';  // 👈 importa o Category

const models = [User, Product, Category]; // 👈 adiciona à lista

class Database {
	constructor() {
		this.init();
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);
		models
			.map((model) => model.init(this.connection))
			.map((model) => model.associate && model.associate(this.connection.models));
	}

	mongo() {
		// Mongoose 6+/driver do Mongo 4+ não aceitam mais useNewUrlParser/useUnifiedTopology.
		// Passar essas opções pode lançar MongoParseError e derrubar a conexão na inicialização.
		this.mongooseConnection = Mongoose.connect(
			process.env.MONGO_URL || 'mongodb://mongo:27017/devburguer'
		);

		this.mongooseConnection
			.then(() => console.log('Conexão com o MongoDB estabelecida'))
			.catch((err) => console.error('Erro ao conectar no MongoDB:', err));
	}
}
export default new Database();