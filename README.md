Application de Liste de Cadeaux de Noël
Cette application a pour objectif de gérer les listes de cadeaux de Noël en permettant aux utilisateurs de créer, afficher, modifier et supprimer des listes ainsi que de réserver des cadeaux pour des personnes spécifiques.

Fonctionnalités
Affichage de Liste : L'application permet d'afficher toutes les listes de cadeaux disponibles.
Détail d'un Cadeau : Chaque cadeau présente un nom, un résumé, un prix, et une image, avec la possibilité de consulter les détails individuels.
Réservation de Cadeaux : Les utilisateurs peuvent réserver un cadeau en spécifiant la personne, le prix réel, et la date de réservation.
Gestion des Listes : Possibilité de créer, modifier et supprimer des listes existantes.
Gestion des Cadeaux : Création, modification et suppression de cadeaux dans les listes.
Structure des Données
Cadeaux

Nom : Nom du cadeau
Résumé : Description brève du cadeau
Prix : Prix du cadeau
Image : Image représentant le cadeau
Date de début de réservation : Date à partir de laquelle le cadeau peut être réservé
Date de fin de réservation : Date limite pour réserver le cadeau
Auteur

Chaque liste de cadeaux est associée à un auteur
Gestion des Dates
Les cadeaux peuvent être réservés dans une période spécifique définie par la date de début et de fin de réservation.
Après la date de fin de réservation, la réservation n'est plus possible pour les cadeaux de cette liste.
Utilisation de l'Application
Installation :

Cloner le repository.
Installer les dépendances avec npm install (ou yarn install).
Lancer l'Application :

Utiliser la commande npm start (ou yarn start) pour démarrer l'application.
Utilisation :

Accéder à l'application via le navigateur à l'adresse http://localhost:3000 (par exemple).
Créer, afficher, modifier et supprimer des listes et des cadeaux.
Réserver des cadeaux en spécifiant les détails requis.
