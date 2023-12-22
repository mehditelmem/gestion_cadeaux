const { Sequelize } = require('sequelize');

// Remplacez ces valeurs par les détails de votre base de données
const sequelize = new Sequelize('cadeaux', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql', // ou 'postgres', 'sqlite', etc., selon votre base de données
});

// Tester la connexion à la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données :', err);
  });

module.exports = sequelize;
