# Résumé de l'Application

## Contexte

L'application est conçue pour aider les petits commerçants (familles, couples, petits magasins) vendant des fruits et légumes à simplifier leurs calculs de vente.

## Objectif

Créer une application mobile-first, avec une approche progressive (PWA), permettant de :

- Sélectionner des produits facilement via de grandes icônes, comme dans un POS.
- Indiquer les quantités, les prix au kilo, ainsi que le prix de vente, et calculer les totaux en temps réel.
- Permettre la gestion des marges en comparant le prix d'achat et le prix de vente, et afficher les marges ou les pourcentages de profit.
- Gérer plusieurs clients et commandes simultanément, avec la possibilité de passer d’un client à un autre facilement.

## Fonctionnalités Futures

- **Historique des ventes** : Une fois la commande terminée, possibilité de marquer la commande comme « terminée » pour la sauvegarder dans un historique, permettant un suivi par jour et la visualisation des ventes.
- **Analyse des données** : À terme, ajout de graphiques pour visualiser les tendances de vente, par exemple pour identifier les produits les plus vendus selon les jours.

## Technologies

- **Front-end** : SvelteKit avec Svelte 5 pour une interface réactive et optimisée pour mobile.
- **Stockage** : PouchDB pour la synchronisation offline-first, la réplication de données, et la gestion des conflits.
- **Styling** : Tailwind CSS 4 avec Skeleton Labs pour les composants UI.
- **Testing** : Vitest + Playwright pour les tests unitaires et E2E.

## Avantages

- Simplicité et rapidité d’utilisation.
- Pas de connexion internet requise, idéal pour les petits commerces.
- Suivi simplifié des ventes et gestion efficace des prix et des marges.

## Avantages de PouchDB

- **Synchronisation offline-first** : Fonctionnement complet sans internet, avec sync automatique quand la connexion revient.
- **Réplication de données** : Possibilité de synchroniser avec un serveur CouchDB pour centraliser les données.
- **Gestion des conflits** : Résolution automatique des modifications simultanées sur plusieurs appareils.
- **Stockage optimisé** : IndexedDB natif pour une meilleure capacité que localStorage seul.
