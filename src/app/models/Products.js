import { DataTypes, Model } from 'sequelize';

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                category_id: {
                    type: DataTypes.INTEGER,
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
        return this;
    }
}

export default Product;