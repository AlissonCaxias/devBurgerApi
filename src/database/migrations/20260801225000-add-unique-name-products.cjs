'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.addConstraint('products', {
      fields: ['name'],
      type: 'unique',
      name: 'products_name_unique',
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeConstraint('products', 'products_name_unique');
  },
};
