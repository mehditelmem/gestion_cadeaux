// controllers/giftController.js
/*
const Gift = require('../models/giftModel');
const List = require('../models/listModel');

// Afficher la liste des cadeaux
exports.getGiftList = async (req, res) => {
  try {
    const gifts = await Gift.findAll();
    res.render('giftList', { gifts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

// Afficher les détails d'un cadeau
exports.getGiftDetails = async (req, res) => {
  try {
    const gift = await Gift.findByPk(req.params.id);
    res.render('giftDetail', { gift });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

// Réserver un cadeau
exports.reserveGift = async (req, res) => {
  try {
    const { person, price, reservationDate } = req.body;
    const gift = await Gift.findByPk(req.params.id);

    if (!gift) {
      return res.status(404).send('Cadeau non trouvé');
    }

    // Vérifier si la réservation est possible (vérifier les dates, etc.)
    // Implémentez la logique selon vos besoins

    // Réserver le cadeau
    gift.reservedBy = person;
    gift.reservationPrice = price;
    gift.reservationDate = reservationDate;
    await gift.save();

    res.redirect('/gifts'); // Rediriger vers la liste des cadeaux
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

// Afficher les cadeaux d'une liste spécifique
exports.getGiftsByList = async (req, res) => {
  try {
    const listId = req.params.listId;
    const list = await List.findByPk(listId, { include: 'gifts' });

    if (!list) {
      return res.status(404).send('Liste non trouvée');
    }

    const gifts = list.gifts || [];

    res.render('giftList', { gifts, list });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};
*/
// controllers/giftController.js
const Gift = require('../models/giftModel');
const List = require('../models/listModel');
const { Op } = require('sequelize');

// Afficher la liste des cadeaux
// exports.getGiftList = async (req, res) => {
//   try {
//     const gifts = await Gift.findAll();
//     res.render('giftList', { gifts });
//   } catch (error) {
//     console.error('Erreur lors de la récupération de la liste des cadeaux :', error);
//     res.status(500).send('Erreur serveur');
//   }
// };

// Afficher la liste des cadeaux avec la possibilité de recherche
exports.getGiftList = async (req, res) => {
  try {
    let gifts;

    // Vérifier si une recherche a été effectuée
    if (req.query.keyword) {
      // Effectuer la recherche par nom de cadeau
      gifts = await Gift.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.keyword}%`, // Recherche insensible à la casse
          },
        },
        order: [['name', 'ASC']], // Tri par ordre alphabétique
      });
    } else {
      // Obtenir tous les cadeaux si aucune recherche n'est effectuée
      gifts = await Gift.findAll({
        order: [['name', 'ASC']], // Tri par ordre alphabétique
      });
    }

    // Rendre la vue avec les résultats de recherche ou la liste complète
    res.render('giftList', { gifts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

// Afficher les détails d'un cadeau
exports.getGiftDetails = async (req, res) => {
  try {
    const gift = await Gift.findByPk(req.params.id);
    if (!gift) {
      return res.status(404).send('Cadeau non trouvé');
    }
    res.render('giftDetail', { gift });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du cadeau :', error);
    res.status(500).send('Erreur serveur');
  }
};

// Réserver un cadeau
exports.reserveGift = async (req, res) => {
    try {
      const { person, price, reservationDate } = req.body;
      const v =1;
      const gift = await Gift.findByPk(req.params.id);
  
      if (!gift) {
        return res.status(404).send('Cadeau non trouvé');
      }
  
      // Vérifier si la réservation est possible (vérifier les dates, etc.)
      // Implémentez la logique selon vos besoins
  
      // Réserver le cadeau
      await Gift.update(
        {
          reservedBy: person,
          reservationPrice: price,
          reservationDate: reservationDate,
          isReserved: 1,
        },
        { where: { id: req.params.id } }
      );
  
      console.log('Après réservation - isReserved:', gift.isReserved);
  
      res.redirect('/gifts'); // Rediriger vers la liste des cadeaux
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  };
  // Afficher les détails d'un cadeau avec réservation
exports.getGiftDetails = async (req, res) => {
    try {
      const gift = await Gift.findByPk(req.params.id);
      if (!gift) {
        return res.status(404).send('Cadeau non trouvé');
      }
  
      res.render('giftDetail', { gift });
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du cadeau :', error);
      res.status(500).send('Erreur serveur');
    }
  };

// Afficher les cadeaux d'une liste spécifique
exports.getGiftsByList = async (req, res) => {
  try {
    const listId = req.params.listId;
    const list = await List.findByPk(listId, { include: 'gifts' });

    if (!list) {
      return res.status(404).send('Liste non trouvée');
    }

    const gifts = list.gifts || [];
    res.render('giftList', { gifts, list });
  } catch (error) {
    console.error('Erreur lors de la récupération des cadeaux pour une liste spécifique :', error);
    res.status(500).send('Erreur serveur');
  }
};
// Afficher le formulaire de réservation
exports.showReservationForm = async (req, res) => {
    try {
      const gift = await Gift.findByPk(req.params.id);
      if (!gift) {
        return res.status(404).send('Cadeau non trouvé');
      }
  
      res.render('reservationForm', { gift });
    } catch (error) {
      console.error('Erreur lors de l\'affichage du formulaire de réservation :', error);
      res.status(500).send('Erreur serveur');
    }
  };
  
  // Traiter le formulaire de réservation
  exports.reserveGift = async (req, res) => {
    try {
      const { person, price, reservationDate } = req.body;
      const gift = await Gift.findByPk(req.params.id);
  
      if (!gift) {
        return res.status(404).send('Cadeau non trouvé');
      }
  
      // Vérifier si la réservation est possible (vérifier les dates, etc.)
      // Implémentez la logique selon vos besoins
  
      // Réserver le cadeau
      gift.reservedBy = person;
      gift.reservationPrice = price;
      gift.reservationDate = reservationDate;
      gift.isReserved = 1;
      const p = gift.id;
      await gift.save();
  
      res.redirect('/gifts/', { p },'/reserve'); // Rediriger vers la liste des cadeaux
    } catch (error) {
      console.error('Erreur lors de la réservation du cadeau :', error);
      res.status(500).send('Erreur serveur');
    }
  };
// Rechercher des cadeaux
/*
exports.searchGifts = async (req, res) => {
  try {
    let gifts;

    // Vérifier si une recherche a été effectuée
    if (req.query.keyword) {
      // Effectuer la recherche par nom de cadeau
      gifts = await Gift.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.keyword}%`, // Recherche insensible à la casse
          },
        },
      });
      res.render('giftSearchResults', { gifts });
    } else {
      // Obtenir tous les cadeaux si aucune recherche n'est effectuée
      gifts = await Gift.findAll();
      res.render('giftList', { gifts });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};
*/
exports.searchGifts = async (req, res) => {
  try {
    let searchResults;
    let gifts; // Ajoutez cette ligne pour déclarer la variable gifts

    // Vérifier si une recherche a été effectuée
    if (req.query.keyword) {
      // Effectuer la recherche par nom de cadeau
      searchResults = await Gift.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.keyword}%`, // Recherche insensible à la casse
          },
        },
      });
    } else {
      // Si aucune recherche n'est effectuée, obtenir tous les cadeaux
      gifts = await Gift.findAll();
    }

    // Rendre la vue avec les résultats de recherche ou tous les cadeaux
    res.render('giftSearchResults', { gifts, searchResults });
  } catch (error) {
    console.error("errur");
    res.status(500).send('Erreur serveur');
  }
};
/*
exports.showEditForm = async (req, res) => {
  try {
    const gift = await Gift.findByPk(req.params.id);
    if (!gift) {
      return res.status(404).send('Cadeau non trouvé');
    }
    res.render('editGiftForm', { gift });
  } catch (error) {
    console.error('Erreur lors de l\'affichage du formulaire de modification :', error);
    res.status(500).send('Erreur serveur');
  }
};
*/
// controllers/giftController.js
// controllers/giftController.js


exports.showUpdateForm = async (req, res) => {
  try {
    const gift = await Gift.findByPk(req.params.id);

    if (!gift) {
      return res.status(404).send('Cadeau non trouvé');
    }

    // Rendre la vue avec le formulaire pré-rempli
    res.render('updateGiftForm', { gift });
  } catch (error) {
    console.error('Erreur lors de l\'affichage du formulaire de mise à jour du cadeau :', error);
    res.status(500).send('Erreur serveur');
  }
};

// Mettre à jour les détails d'un cadeau
exports.updateGift = async (req, res) => {
  try {
    const { name, summary, price, /* autres champs */ } = req.body;
    const gift = await Gift.findByPk(req.params.id);

    if (!gift) {
      return res.status(404).send('Cadeau non trouvé');
    }

    // Mettez à jour les propriétés du cadeau avec les nouvelles valeurs
    gift.name = name;
    gift.summary = summary;
    gift.price = price;
    // Mettez à jour d'autres champs au besoin

    // Enregistrez les modifications
    await gift.save();

    console.log('Cadeau mis à jour. Redirection vers les détails :', gift.id);

    // Redirigez vers les détails mis à jour du cadeau
    res.redirect(`/gifts/${gift.id}`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du cadeau :', error);
    res.status(500).send('Erreur serveur');
  }
};


exports.getRech = async (req, res) => {
  try {
    let gifts;

    // Vérifier si une recherche a été effectuée
    if (req.query.keyword) {
      // Effectuer la recherche par nom de cadeau
      gifts = await Gift.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.keyword}%`, // Recherche insensible à la casse
          },
        },
      });
    } else {
      // Obtenir tous les cadeaux si aucune recherche n'est effectuée
      gifts = await Gift.findAll();
    }

    // Rendre la vue avec les résultats de recherche ou la liste complète
    res.render('giftList', { gifts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};