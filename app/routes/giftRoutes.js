// routes/giftRoutes.js
/*
const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');

// Afficher la liste des cadeaux
router.get('/gifts', giftController.getGiftList);

// Afficher les détails d'un cadeau
router.get('/gifts/:id', giftController.getGiftDetails);

// Réserver un cadeau
router.post('/gifts/:id/reserve', giftController.reserveGift);

module.exports = router;
*/

// routes/giftRoutes.js
const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');


// Afficher la liste des cadeaux
router.get('/gifts', giftController.getGiftList);

// Afficher les détails d'un cadeau
router.get('/gifts/:id', giftController.getGiftDetails);

// Réserver un cadeau (afficher le formulaire)
router.get('/gifts/:id/reserve', giftController.showReservationForm);

// Soumettre le formulaire de réservation
router.post('/gifts/:id/reserve', giftController.reserveGift);

//router.get('/gifts/search', giftController.searchGifts);

router.get('/gifts/search', giftController.searchGifts);


router.post('/gifts/:id/update', giftController.updateGift);

router.get('/gifts/up', giftController.getGiftList);

module.exports = router;
