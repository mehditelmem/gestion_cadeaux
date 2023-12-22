// models/giftModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Gift = sequelize.define('Gift', {
  name: { type: DataTypes.STRING, allowNull: false },
  summary: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  reservationStartDate: { type: DataTypes.DATE, allowNull: false },
  reservationEndDate: { type: DataTypes.DATE, allowNull: false },

  // Nouveaux champs pour la réservation
  reservedBy: { type: DataTypes.STRING, allowNull: true }, // Peut être nul si non réservé
  reservationPrice: { type: DataTypes.FLOAT, allowNull: true },
  reservationDate: { type: DataTypes.DATE, allowNull: true },
  isReserved: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Gift;
