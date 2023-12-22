'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListeCadeaux extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ListeCadeaux.init({
    nom: DataTypes.STRING,
    auteur: DataTypes.STRING,
    dateDebutReservation: DataTypes.DATE,
    dateFinReservation: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ListeCadeaux',
  });
  return ListeCadeaux;
};