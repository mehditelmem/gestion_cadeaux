// routes/listRoutes.js
const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');



// Afficher la liste des listes
router.get('/lists', listController.getListList);

// Afficher le formulaire pour créer une nouvelle liste
router.get('/lists/create', (req, res) => res.render('createList'));

// Gérer la création d'une nouvelle liste
router.post('/lists/create', listController.createList);

// Afficher les détails d'une liste
router.get('/lists/:id', listController.getListDetails);

// Supprimer une liste
router.post('/lists/:id/delete', listController.deleteList);


// Afficher le formulaire pour modifier une liste
router.get('/lists/:id/edit', listController.getEditListForm);

// Gérer la modification d'une liste
router.post('/lists/:id/edit', listController.updateList); // Mettez à jour le nom de la fonction

router.get('/lists/:listId/addGift', listController.getAddGiftForm);

// Gérer l'ajout d'un cadeau à une liste
router.post('/lists/:listId/addGift', listController.addGiftToList);



module.exports = router;