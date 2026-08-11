'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.changeColumn('products', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn('products', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};