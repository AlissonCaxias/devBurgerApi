import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.cjs';
import User from '../app/models/User.js';
import Product from '../app/models/Products.js'; // 👈 importa o Product

const models = [User, Product]; // 👈 adiciona à lista

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);
		models
			.map((model) => model.init(this.connection))
			/*.map(
				(model) => model.associate && model.associate(this.connection.models),
			)*/;
	}
}
export default new Database();