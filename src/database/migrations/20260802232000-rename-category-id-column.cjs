'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.renameColumn('products', 'category_Id', 'category_id');
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.renameColumn('products', 'category_id', 'category_Id');
  },
};
