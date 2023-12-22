// app.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database'); // Assurez-vous que le chemin est correct

const app = express();

// Middleware pour traiter les données POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Définir le moteur de vue et le répertoire des vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Définir le dossier des ressources statiques (images, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Charger les routes
const giftRoutes = require('./app/routes/giftRoutes');
const listRoutes = require('./app/routes/listRoutes');

// Utiliser les routes
app.use('/', giftRoutes);
app.use('/', listRoutes);
app.use('/s',giftRoutes);

// Gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).send("Désolé, la page que vous recherchez n'existe pas.");
});

// Gérer les erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur serveur');
});

// Synchroniser la base de données et démarrer le serveur
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
});
