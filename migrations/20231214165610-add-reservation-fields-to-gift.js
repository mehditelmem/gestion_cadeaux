'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Gifts', 'isReserved', { type: Sequelize.INTEGER, defaultValue: 0 });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Gifts', 'isReserved');
  },
};