import Sequelize, { Model } from "sequelize";

class Category extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            image: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return this.image ? `http://localhost:3001/categories-files/${this.image}` : null;
                },
            }
        },
            {
                sequelize,
                tableName: 'categories',
                timestamps: true,
                underscored: true, // Usa created_at e updated_at em vez de createdAt e updatedAt
            });
        return this;
    }
}

export default Category;