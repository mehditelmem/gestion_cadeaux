'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Gifts', 'reservedBy', { type: Sequelize.STRING, allowNull: true });
    await queryInterface.addColumn('Gifts', 'reservationPrice', { type: Sequelize.FLOAT, allowNull: true });
    await queryInterface.addColumn('Gifts', 'reservationDate', { type: Sequelize.DATE, allowNull: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Gifts', 'reservedBy');
    await queryInterface.removeColumn('Gifts', 'reservationPrice');
    await queryInterface.removeColumn('Gifts', 'reservationDate');
  }
};