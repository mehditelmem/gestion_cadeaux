// models/listModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Gift = require('./giftModel');

const List = sequelize.define('List', {
  title: { type: DataTypes.STRING, allowNull: false },
  reservationEndDate: { type: DataTypes.DATE, allowNull: false },
});

// Une liste peut contenir plusieurs cadeaux
List.hasMany(Gift, { as: 'gifts' });

module.exports = List;
