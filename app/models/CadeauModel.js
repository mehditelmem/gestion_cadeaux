/*
const mysql = require('mysql');
const config = require('../../config');
const ListeCadeaux = require('./ListeCadeaux');
class Cadeau {
  constructor(id, nom, resume, prix, image) {
    this.id = id;
    this.nom = nom;
    this.resume = resume;
    this.prix = prix;
    this.image = image;
  }

  // Méthode pour sauvegarder le cadeau dans la base de données
  save() {
    const connection = mysql.createConnection(config.database);

    connection.connect();

    const sql = 'INSERT INTO cadeaux SET ?';
    const values = {
      id: this.id,
      nom: this.nom,
      resume: this.resume,
      prix: this.prix,
      image: this.image,
    };

    connection.query(sql, values, (error, results, fields) => {
      if (error) throw error;
      console.log('Cadeau ajouté avec succès!');
    });

    connection.end();
  }
}

//Cadeau.belongsTo(ListeCadeaux, { foreignKey: 'listeCadeauxId' });

module.exports = Cadeau;
*/
/*
// CadeauModel.js
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../config/database');

const Cadeau = sequelize.define('Cadeau', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // Assurez-vous que le type est correct
    allowNull: false,
  },
});

module.exports = Cadeau;
*/

// models/CadeauModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Cadeau = sequelize.define('Cadeau', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // Vous pouvez ajuster le type selon votre besoin (VARCHAR, TEXT, etc.)
    allowNull: false,
  },
});

module.exports = Cadeau;
