'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('categories', 'image', {
          type: Sequelize.STRING,
      });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn('categories', 'image');
  }
};
