import { DataTypes, Model } from 'sequelize';

class Product extends Model {
    static init(sequelize) {
        Model.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                category: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                image: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                url: {
                    type: DataTypes.VIRTUAL,
                    get() {
                        return this.image ? `http://localhost:3001/files/${this.image}` : null;
                    },
                },
            },
            {
                sequelize,
                tableName: 'products',
                timestamps: true,        // 👈 liga o controle automático
                underscored: true,       // 👈 usa created_at/updated_at (snake_case) em vez de createdAt/updatedAt
            }
        );
    }
}

export default Product;