import Sequelize, { Model } from "sequelize";

class Category extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING
        }, {
            sequelize,
            tableName: 'categories',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
        return this;
    }
}

export default Category;