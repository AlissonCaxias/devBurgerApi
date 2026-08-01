import { DataTypes, Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password_hash: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                admin: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                tableName: 'users',
            }
        );
        return this;
    }
}

export default User;