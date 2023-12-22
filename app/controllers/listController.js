// controllers/listController.js
const List = require('../models/listModel');
const Gift = require('../models/giftModel');

/// Fonction pour afficher la liste des listes
exports.getListList = async (req, res) => {
    try {
      const lists = await List.findAll({ include: 'gifts' });
      res.render('index', { lists });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  };
  
  // Fonction pour afficher les détails d'une liste
exports.getListDetails = async (req, res) => {
    try {
      const list = await List.findByPk(req.params.id, { include: 'gifts' });
      res.render('listDetail', { list });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  };
  
  // Fonction pour créer une nouvelle liste
  exports.createList = async (req, res) => {
    try {
      const { title, reservationEndDate } = req.body;
      const newList = await List.create({ title, reservationEndDate });
      res.redirect('/lists'); // Rediriger vers la liste des listes
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  };
  exports.getAddGiftForm = async (req, res) => {
    try {
      const list = await List.findByPk(req.params.listId);
      res.render('addGiftForm', { list });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  };
 // controllers/listController.js
exports.addGiftToList = async (req, res) => {
    try {
      const { listId } = req.params;
      const {
        name,
        summary,
        price,
        image,
        author,
        reservationStartDate,
        reservationEndDate
      } = req.body;
  
      // Vérifier si la liste existe
      const list = await List.findByPk(listId);
      if (!list) {
        return res.status(404).send('Liste non trouvée');
      }
  
      // Créer le cadeau et l'associer à la liste
      const newGift = await Gift.create({
        name,
        summary,
        price,
        image,
        author,
        reservationStartDate,
        reservationEndDate
      });
  
      // Ajouter le cadeau à la liste
      await list.addGift(newGift);
  
      res.redirect(`/lists/${listId}`); // Rediriger vers les détails de la liste
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  };
  
exports.getEditListForm = async (req, res) => {
    try {
      const list = await List.findByPk(req.params.id);
      res.render('editList', { list });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  };
  
  // Modifier une liste existante
exports.updateList = async (req, res) => {
    try {
      const { title, reservationEndDate } = req.body;
      const listId = req.params.id;
      const updatedList = await List.findByPk(listId);
  
      if (!updatedList) {
        return res.status(404).send('Liste non trouvée');
      }
  
      // Mettre à jour les champs de la liste
      updatedList.title = title;
      updatedList.reservationEndDate = reservationEndDate;
      await updatedList.save();
  
      res.redirect('/lists'); // Rediriger vers la liste des listes
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  };
  
  // Supprimer une liste
exports.deleteList = async (req, res) => {
    try {
      const listId = req.params.id;
      const deletedList = await List.findByPk(listId);
  
      if (!deletedList) {
        return res.status(404).send('Liste non trouvée');
      }
  
      // Supprimer la liste
      await deletedList.destroy();
  
      res.redirect('/lists'); // Rediriger vers la liste des listes
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  };