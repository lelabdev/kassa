# 📋 Brouillon - GitHub Issues pour Kassa (Approche TDD)

Brouillon complet des GitHub Issues pour le projet Kassa avec une approche **Test-Driven Development (TDD)**. Le setup de base est déjà fait (SvelteKit, Svelte 5, Skeleton, Tailwind, TypeScript, ESLint, Prettier, Vitest, Playwright).

---

## 🧪 Approche TDD pour ce Projet

**Red → Green → Refactor**

Pour chaque issue, le workflow est:

1. **🔴 RED**: Écrire les tests en premier
   - Créer les fichiers `.spec.ts` / `.svelte.spec.ts`
   - Écrire tous les cas de test (happy path, edge cases, erreurs)
   - Les tests doivent échouer au départ (c'est normal!)

2. **🟢 GREEN**: Écrire le code minimum pour passer les tests
   - Implémenter juste ce qui est nécessaire
   - Ne pas ajouter de "polish" ou features extras
   - Tous les tests doivent passer

3. **🔵 REFACTOR**: Améliorer et nettoyer
   - Refactoriser le code si nécessaire
   - Améliorer la lisibilité et performance
   - Les tests continuent à passer

**Avantages du TDD pour ce projet:**
- ✅ Code plus robuste (coverage 100% par défaut)
- ✅ Calculs fintech = tests essentiels (pas d'erreurs de marge!)
- ✅ Facilite les refactos futures
- ✅ Documentation vivante (tests = spec)
- ✅ Offline-first complexe = besoin de tests solides

---

## ⚡ PHASE 0: SETUP REMAINING (Fondations Restantes)

### Issue 0.1: Configuration PouchDB + Types TypeScript
**Type**: Setup
**Labels**: `setup`, `database`, `pouchdb`, `critical`
**Priority**: 🔴 Critique
**Description**:
Installer et configurer PouchDB pour la persistance offline-first:
- Installer pouchdb et ses types TypeScript
- Créer la configuration initiale de PouchDB
- Créer les interfaces TypeScript pour les documents (Client, Product, Order, OrderItem)
- Créer le module d'initialisation de PouchDB dans lib/db
- Tester la création et récupération de documents
- Vérifier que IndexedDB fonctionne bien

**Tâches**:
- [ ] `pnpm add pouchdb`
- [ ] `pnpm add -D @types/pouchdb`
- [ ] Créer src/lib/types/database.ts avec interfaces
- [ ] Créer src/lib/db/database.ts avec initialisation PouchDB
- [ ] Tester: créer un doc, reloader la page, vérifier la persistance
- [ ] Vérifier dans DevTools que IndexedDB est bien utilisé

**Acceptance Criteria**:
- PouchDB s'initialise sans erreurs
- Données persisten après page reload
- Types TypeScript corrects (pas de `any`)
- IndexedDB visible dans DevTools

---

### Issue 0.2: Structure du projet - Vérifier & compléter
**Type**: Setup
**Labels**: `setup`, `architecture`
**Priority**: 🟡 Haute
**Description**:
Vérifier et compléter la structure des dossiers:
- Vérifier src/lib/components/ existe pour les composants réutilisables
- Vérifier src/lib/types/ existe pour les interfaces
- Vérifier src/lib/stores/ existe pour la gestion d'état Svelte 5
- Vérifier src/lib/utils/ existe pour les utilitaires
- Vérifier src/lib/db/ existe pour les opérations PouchDB
- Vérifier src/routes/ a un bon layout
- Créer e2e/ pour les tests Playwright
- Créer un index.ts dans lib/ avec les exports publiques

**Tâches**:
- [ ] Vérifier la structure existante
- [ ] Créer les dossiers manquants
- [ ] Créer src/lib/index.ts avec exports
- [ ] Ajouter des README dans chaque dossier d'importance

**Acceptance Criteria**:
- Structure claire et cohérente
- Facile de naviguer et maintenir
- Alias $lib fonctionne correctement

---

### Issue 0.3: Configuration du mode PWA et Service Worker
**Type**: Setup
**Labels**: `setup`, `pwa`, `service-worker`, `offline-first`
**Priority**: 🟡 Haute
**Description**:
Configurer l'app comme PWA avec service worker pour fonctionner offline:
- Créer un service worker de base
- Implémenter une stratégie de caching offline-first
- Ajouter le manifest.json pour PWA
- Tester l'offline mode (DevTools)
- Ajouter les métadonnées PWA (meta tags, icons)

**Tâches**:
- [ ] Créer src/service-worker.ts
- [ ] Configurer la stratégie de caching (cache network, stale-while-revalidate)
- [ ] Créer public/manifest.json
- [ ] Ajouter meta tags PWA dans app.html (theme-color, viewport, etc.)
- [ ] Ajouter icons (favicon, app icon)
- [ ] Enregistrer le service worker dans +layout.svelte
- [ ] Tester offline: DevTools > Network > Offline, puis rafraîchir

**Acceptance Criteria**:
- App fonctionnelle complètement offline
- Service worker enregistré et visible dans DevTools
- Peut être installée comme app sur mobile
- Manifest.json valide

---

### Issue 0.4: Configuration des variables d'environnement & config
**Type**: Setup
**Labels**: `setup`, `config`, `environment`
**Priority**: 🟡 Moyenne
**Description**:
Configurer la gestion des variables d'environnement:
- Créer .env.example documenté
- Créer src/lib/config.ts pour centraliser les configs
- Supporter dev, preview, production
- Documenter les variables requises et optionnelles

**Tâches**:
- [ ] Créer .env.example
- [ ] Créer .env.local pour dev (git ignored)
- [ ] Créer src/lib/config.ts avec import.meta.env
- [ ] Documenter les variables
- [ ] Vérifier .gitignore ignore les .env

**Acceptance Criteria**:
- Config centralisée et typée
- Pas de secrets en git
- Fonctionne en dev, preview, production

---

### Issue 0.5: Configuration du déploiement Cloudflare (adapter + pages)
**Type**: Setup
**Labels**: `setup`, `deployment`, `cloudflare`
**Priority**: 🟡 Moyenne
**Description**:
Vérifier et finaliser la configuration pour Cloudflare:
- Adapter-cloudflare est déjà là
- Vérifier le build: `pnpm build` fonctionne
- Configurer wrangler.toml si nécessaire
- Prévoir la stratégie de déploiement (Pages, Workers)
- Tester le build et preview: `pnpm preview`

**Tâches**:
- [ ] `pnpm build` - vérifier sans erreurs
- [ ] `pnpm preview` - tester localement (port 4173)
- [ ] Configurer wrangler.toml si Pages
- [ ] Tester qu'offline fonctionne en preview

**Acceptance Criteria**:
- Build réussit sans warnings
- Preview fonctionne correctement
- Offline fonctionne en preview

---

### Issue 0.6: Setup CI/CD - GitHub Actions
**Type**: Setup
**Labels**: `setup`, `ci-cd`, `github-actions`
**Priority**: 🟡 Basse
**Description**:
Configurer les pipelines GitHub Actions:
- Workflow pour les tests (lint, unit, e2e)
- Workflow pour le build
- Optionnel: Workflow pour déploiement auto Cloudflare

**Tâches**:
- [ ] Créer .github/workflows/test.yml
- [ ] Créer .github/workflows/build.yml
- [ ] Tester les workflows sur des PRs
- [ ] Optionnel: workflow de déploiement

**Acceptance Criteria**:
- Tests passent en CI
- Build réussit en CI

---

## 🎯 PHASE 1: FEATURES MVP - CORE CALCULATIONS

### Issue 1.1: Interfaces TypeScript pour les données métier
**Type**: Feature / Architecture
**Labels**: `feature`, `architecture`, `types`, `core`
**Priority**: 🔴 Critique
**Description**:
Créer et documenter tous les types TypeScript pour le métier:
- Type Client (id, nom, email?, téléphone?)
- Type Product (id, nom, icon?, prixParDéfaut?)
- Type OrderItem (productId, quantité, prixAchatUnitaire, prixVenteUnitaire)
- Type Order (id, clientId, items[], dateCreation, statut)
- Type CalculatedMargin (prixAchatTotal, prixVenteTotal, marge, pourcentageProfit)

**Tâches**:
- [ ] Créer src/lib/types/business.ts
- [ ] Définir toutes les interfaces sans `any`
- [ ] Exporter dans src/lib/index.ts
- [ ] Ajouter des commentaires JSDoc

**Acceptance Criteria**:
- Types complets et documentés
- Utilisables partout dans l'app
- Pas de `any` types

---

### Issue 1.2: Logique de calcul des marges et totaux (TDD)
**Type**: Feature
**Labels**: `feature`, `calculation`, `core`, `logic`, `tdd`
**Priority**: 🔴 Critique
**Description**:
Implémenter la logique métier de calcul avec approche TDD:
- `calculateItemCost(quantity: number, pricePerUnit: number): number`
- `calculateItemRevenue(quantity: number, salePrice: number): number`
- `calculateMargin(cost: number, revenue: number): number`
- `calculateProfitPercentage(margin: number, cost: number): number`
- `calculateOrderTotals(items: OrderItem[]): OrderTotals`

**Workflow TDD:**

**🔴 RED - Écrire les tests d'abord:**
- [ ] Créer src/lib/utils/calculations.spec.ts
- [ ] Tests calculateItemCost: cas normal, décimales, zéro, grande valeur
- [ ] Tests calculateItemRevenue: identique
- [ ] Tests calculateMargin: normal, margin positive/négative, zéro
- [ ] Tests calculateProfitPercentage: éviter division par zéro, décimales
- [ ] Tests calculateOrderTotals: ordre vide, un item, multiples items
- [ ] `pnpm test:unit calculations` → tous échouent ✓

**🟢 GREEN - Écrire le code minimum:**
- [ ] Créer src/lib/utils/calculations.ts
- [ ] Implémenter les 5 fonctions (pas de polish, juste passer les tests)
- [ ] `pnpm test:unit calculations` → tous passent ✓

**🔵 REFACTOR - Améliorer:**
- [ ] Revoir la performance (si pertinent)
- [ ] Améliorer la lisibilité
- [ ] Ajouter des commentaires JSDoc
- [ ] `pnpm test:unit calculations` → tous passent toujours ✓

**Acceptance Criteria**:
- ✅ Coverage 100% sur calculations.ts
- ✅ Tous les tests passent
- ✅ Tests couvrent: cas normal, décimales, zéros, négatifs, division par zéro, edge cases

---

### Issue 1.3: Store Svelte pour la commande active (Svelte 5 Runes - TDD)
**Type**: Feature
**Labels**: `feature`, `state-management`, `svelte-runes`, `core`, `tdd`
**Priority**: 🔴 Critique
**Description**:
Créer un store Svelte 5 pour la commande active avec approche TDD:
- `$state` pour la commande courante
- `$state` pour la liste des items
- `$derived` pour les totaux calculés
- Fonctions: addItem(), removeItem(), updateItem(), clearOrder()
- Synchronisation avec PouchDB

**Workflow TDD:**

**🔴 RED - Écrire les tests d'abord:**
- [ ] Créer src/lib/stores/order.svelte.spec.ts
- [ ] Tests addItem: ajout normal, vérifier que l'état change
- [ ] Tests removeItem: suppression existant, suppression inexistant
- [ ] Tests updateItem: mise à jour normal, quantité à zéro
- [ ] Tests clearOrder: vider une commande non-vide, vider une commande vide
- [ ] Tests $derived: totaux se recalculent automatiquement après ajout/suppression
- [ ] Tests de réactivité: $state.snapshot() pour vérifier les states
- [ ] `pnpm test:unit order` → tous échouent ✓

**🟢 GREEN - Écrire le code minimum:**
- [ ] Créer src/lib/stores/order.svelte.ts
- [ ] Implémenter $state pour order et items
- [ ] Implémenter $derived pour totaux (réutiliser calculateOrderTotals de 1.2)
- [ ] Implémenter les 4 fonctions
- [ ] `pnpm test:unit order` → tous passent ✓

**🔵 REFACTOR - Améliorer:**
- [ ] Optimiser la réactivité si nécessaire
- [ ] Ajouter JSDoc
- [ ] Vérifier la synchronisation PouchDB (issue 2.6)
- [ ] `pnpm test:unit order` → tous passent toujours ✓

**Acceptance Criteria**:
- ✅ Coverage 100% sur order.svelte.ts
- ✅ Tous les tests passent
- ✅ $derived se met à jour automatiquement
- ✅ Utilisable dans les composants avec $effect

---

### Issue 1.4: Composant formulaire d'entrée produit
**Type**: Feature
**Labels**: `feature`, `ui`, `component`, `form`, `core`
**Priority**: 🔴 Haute
**Description**:
Composant pour entrer les détails d'un produit dans la commande:
- Sélection du produit (dropdown ou grid)
- Input quantité (décimal)
- Input prix d'achat (décimal)
- Input prix de vente (décimal)
- Affichage en temps réel des calculs (marge, %)
- Boutons: Ajouter / Annuler
- Validation des inputs

**Tâches**:
- [ ] Créer src/lib/components/ProductForm.svelte
- [ ] Utiliser Skeleton Labs Button, Input, Select
- [ ] Validation temps réel avec feedback
- [ ] Afficher les calculs sous les inputs
- [ ] Événement on:addProduct avec les données
- [ ] Tests du formulaire

**Acceptance Criteria**:
- Formulaire fonctionne
- Calculs affichés en temps réel
- Validation claire

---

### Issue 1.5: Composant grille de sélection de produits (POS-style)
**Type**: Feature
**Labels**: `feature`, `ui`, `component`, `ux-core`, `packing`
**Priority**: 🔴 Critique
**Description**:
Grille de produits style POS:
- Grid responsive de produits
- Grandes icônes tactiles (min 64x64px)
- Nom du produit sous l'icône
- Au clic: affiche le formulaire ProductForm
- Indicateur visuel du produit sélectionné
- Smooth sur mobile, pas de lag

**Tâches**:
- [ ] Créer src/lib/components/ProductGrid.svelte
- [ ] Récupérer les produits de PouchDB
- [ ] Grid Tailwind responsive (1-2-3 colonnes selon écran)
- [ ] Icônes (emoji, SVG ou images)
- [ ] Clic = affiche ProductForm
- [ ] Tests visuels sur mobile

**Acceptance Criteria**:
- Grille responsive
- Icônes grandes et tactiles
- Pas de lag, fluide
- Responsive mobile/tablet/desktop

---

### Issue 1.6: Composant affichage des items de la commande
**Type**: Feature
**Labels**: `feature`, `ui`, `component`, `order-display`
**Priority**: 🔴 Haute
**Description**:
Affichage des items ajoutés à la commande:
- Tableau/liste des items: produit, qty, prixAchat, prixVente, marge, %profit
- Bouton pour modifier/supprimer chaque item
- Totaux en bas: coûtTotal, revenuTotal, margeTotal, %profitTotal
- Numérotation des items
- Scroll si beaucoup d'items
- Mobile-friendly

**Tâches**:
- [ ] Créer src/lib/components/OrderItems.svelte
- [ ] Afficher liste/tableau des items
- [ ] Boutons modifier/supprimer
- [ ] Afficher les totaux avec style
- [ ] Formatage monétaire (2 décimales)
- [ ] Tests du composant

**Acceptance Criteria**:
- Items affichés correctement
- Totaux mis à jour en temps réel
- Interface lisible et claire

---

### Issue 1.7: Page d'accueil / main layout
**Type**: Feature
**Labels**: `feature`, `ui`, `page`, `layout`, `core`
**Priority**: 🔴 Haute
**Description**:
Layout principal de l'application:
- Grille 2 colonnes: ProductGrid | OrderItems (desktop)
- Layout adaptif pour mobile (ProductGrid en haut, OrderItems en bas)
- Header: nom du client actif, menu
- Footer: boutons d'action (Valider commande, etc.)
- Navigation vers autres pages

**Tâches**:
- [ ] Créer/modifier src/routes/+page.svelte
- [ ] Layout 2 colonnes responsive
- [ ] Header et footer
- [ ] Intégrer ProductGrid et OrderItems
- [ ] Navigation de base
- [ ] Tester responsive

**Acceptance Criteria**:
- Layout fonctionne desktop et mobile
- Tous les composants visibles
- Navigation ok

---

## 🏢 PHASE 2: GESTION MULTI-CLIENTS & PERSISTANCE

### Issue 2.1: Store Svelte pour les clients et commandes
**Type**: Feature
**Labels**: `feature`, `state-management`, `svelte-runes`, `clients`
**Priority**: 🟡 Critique
**Description**:
Store Svelte 5 pour gérer les clients et leurs commandes:
- `$state` pour la liste des clients
- `$state` pour le client actif
- `$derived` pour les commandes du client actif
- Fonctions: addClient(), deleteClient(), setActiveClient()
- Charger les clients de PouchDB au démarrage

**Tâches**:
- [ ] Créer src/lib/stores/clients.svelte.ts
- [ ] Utiliser $state pour clients et client actif
- [ ] Utiliser $derived pour les commandes du client
- [ ] Charger de PouchDB au démarrage
- [ ] Tests du store

**Acceptance Criteria**:
- Store réactif fonctionne
- Clients chargés au démarrage
- Changement de client fonctionne

---

### Issue 2.2: Opérations CRUD PouchDB pour Clients
**Type**: Feature
**Labels**: `feature`, `database`, `pouchdb`, `crud`, `core`
**Priority**: 🟡 Critique
**Description**:
CRUD des clients dans PouchDB:
- createClient(data): Promise<Client>
- getClients(): Promise<Client[]>
- updateClient(id, data): Promise<Client>
- deleteClient(id): Promise<void>
- Gestion d'erreurs
- Tests du CRUD

**Tâches**:
- [ ] Créer src/lib/db/clients.ts
- [ ] Implémenter les 4 fonctions CRUD
- [ ] Gestion d'erreurs avec try/catch
- [ ] Tests de chaque opération
- [ ] Vérifier les données en DevTools

**Acceptance Criteria**:
- CRUD fonctionne complètement
- Pas d'erreurs PouchDB
- Données persisten

---

### Issue 2.3: Opérations CRUD PouchDB pour Commandes
**Type**: Feature
**Labels**: `feature`, `database`, `pouchdb`, `crud`, `core`
**Priority**: 🟡 Critique
**Description**:
CRUD des commandes dans PouchDB:
- createOrder(clientId, items): Promise<Order>
- getOrdersByClient(clientId): Promise<Order[]>
- updateOrder(id, data): Promise<Order>
- deleteOrder(id): Promise<void>
- getOrdersByStatus(status): Promise<Order[]>

**Tâches**:
- [ ] Créer src/lib/db/orders.ts
- [ ] Implémenter les 5 fonctions CRUD
- [ ] Filtrage par clientId et status
- [ ] Tests du CRUD
- [ ] Gestion d'erreurs

**Acceptance Criteria**:
- CRUD fonctionne
- Filtrage par client et status
- Données persisten

---

### Issue 2.4: Composant formulaire ajout/édition client
**Type**: Feature
**Labels**: `feature`, `ui`, `component`, `form`
**Priority**: 🟡 Moyenne
**Description**:
Formulaire pour créer/éditer un client:
- Input: nom (requis)
- Input: téléphone (optionnel)
- Input: email (optionnel)
- Validation: nom non-vide
- Boutons: Enregistrer / Annuler
- Modal ou page dédiée

**Tâches**:
- [ ] Créer src/lib/components/ClientForm.svelte
- [ ] Inputs Skeleton Labs
- [ ] Validation temps réel
- [ ] Mode: ajouter/éditer
- [ ] Appeler createClient ou updateClient
- [ ] Tests du formulaire

**Acceptance Criteria**:
- Formulaire fonctionne
- Validation ok
- Client enregistré en DB

---

### Issue 2.5: Composant sélecteur/switcher de client
**Type**: Feature
**Labels**: `feature`, `ui`, `component`, `navigation`
**Priority**: 🟡 Haute
**Description**:
Composant pour basculer entre les clients:
- Dropdown ou select Skeleton Labs
- Affiche le client actif
- Bouton "+ Ajouter client" intégré
- Rapide et réactif

**Tâches**:
- [ ] Créer src/lib/components/ClientSwitcher.svelte
- [ ] Select Skeleton Labs avec tous les clients
- [ ] Au changement: setActiveClient()
- [ ] Bouton "+ Ajouter" pour ouvrir form
- [ ] Intégrer dans le header

**Acceptance Criteria**:
- Switcher affiche les clients
- Basculement rapide
- Ajout de client possible

---

### Issue 2.6: Sauvegarder & restaurer la commande active par client
**Type**: Feature
**Labels**: `feature`, `persistence`, `ux`, `workflow`
**Priority**: 🟡 Moyenne
**Description**:
Quand on change de client, la commande active doit être sauvegardée/restaurée:
- Au changement de client: sauvegarder la commande courante (si pas vide)
- À l'ouverture d'un client: charger sa dernière commande active (ou en créer une)
- Transparent pour l'utilisateur

**Tâches**:
- [ ] Modifier order.svelte.ts pour ajouter clientId
- [ ] Au changement de client: sauvegarder la commande
- [ ] Au sélection: charger la dernière commande du client
- [ ] Tests du workflow

**Acceptance Criteria**:
- Commandes sauvegardées correctement
- Pas de perte de données
- Transparent pour l'user

---

## 📊 PHASE 3: HISTORIQUE & STATISTIQUES

### Issue 3.1: Marquer une commande comme terminée
**Type**: Feature
**Labels**: `feature`, `workflow`, `history`, `core`
**Priority**: 🟡 Haute
**Description**:
Ajouter le workflow de validation d'une commande:
- Bouton "Valider / Terminer commande" dans OrderItems
- Au clic: confirmation dialog
- Marque la commande comme "terminée"
- Ajoute la dateFinished
- Crée une nouvelle commande vide pour le client
- Feedback utilisateur (toast)

**Tâches**:
- [ ] Ajouter champ statut et dateFinished au type Order
- [ ] Créer le bouton de validation
- [ ] Dialog de confirmation Skeleton Labs
- [ ] Logique: marquer + créer nouvelle
- [ ] Tests du workflow

**Acceptance Criteria**:
- Commande marquée comme terminée
- Nouvelle commande créée
- Historique populé

---

### Issue 3.2: Page historique des ventes par jour
**Type**: Feature
**Labels**: `feature`, `history`, `page`, `analytics`
**Priority**: 🟡 Moyenne
**Description**:
Page affichant l'historique groupé par jour:
- Affiche les jours avec ventes
- Pour chaque jour: liste des commandes, totaux du jour
- Clic sur une commande: voir les détails (items, calculs)
- Filtres optionnels: par date, par client

**Tâches**:
- [ ] Créer src/routes/history/+page.svelte
- [ ] Requête PouchDB groupée par jour
- [ ] Afficher les jours et totaux
- [ ] Afficher les commandes d'un jour
- [ ] Clic pour voir détails
- [ ] Navigation depuis main page

**Acceptance Criteria**:
- Historique s'affiche
- Groupement par jour ok
- Détails accessibles

---

### Issue 3.3: Statistiques globales par période
**Type**: Feature
**Labels**: `feature`, `statistics`, `analytics`
**Priority**: 🟢 Basse
**Description**:
Ajouter des stats globales:
- Total des ventes par jour/semaine/mois
- Total des marges
- Nombre de commandes
- Montant moyen par commande

**Tâches**:
- [ ] Créer src/lib/utils/statistics.ts
- [ ] Fonctions de calcul des stats
- [ ] Tests
- [ ] Afficher dans l'historique

**Acceptance Criteria**:
- Stats calculées correctement
- Affichées clairement

---

### Issue 3.4: Graphiques des ventes (Chart.js ou Recharts)
**Type**: Feature
**Labels**: `feature`, `charts`, `analytics`, `future`
**Priority**: 🟢 Basse
**Description**:
Ajouter des visualisations:
- Graphique des ventes par jour (30 jours)
- Graphique des produits les plus vendus
- Responsive et interactif

**Tâches**:
- [ ] Choisir Chart.js ou Recharts
- [ ] Installer et configurer
- [ ] Créer composants de graphiques
- [ ] Ajouter page "Analytics"
- [ ] Tests visuels

**Acceptance Criteria**:
- Graphiques s'affichent
- Données à jour
- Responsive

---

## ⚙️ PHASE 4: CONFIGURATION & PARAMÈTRES

### Issue 4.1: CRUD PouchDB pour les produits
**Type**: Feature
**Labels**: `feature`, `database`, `pouchdb`, `crud`
**Priority**: 🟡 Moyenne
**Description**:
CRUD des produits dans PouchDB:
- createProduct(nom, icon?, prixParDéfaut?): Promise<Product>
- getProducts(): Promise<Product[]>
- updateProduct(id, data): Promise<Product>
- deleteProduct(id): Promise<void>

**Tâches**:
- [ ] Créer src/lib/db/products.ts
- [ ] Implémenter les 4 fonctions CRUD
- [ ] Tests de chaque opération
- [ ] Gestion d'erreurs

**Acceptance Criteria**:
- CRUD fonctionne
- Produits utilisables dans ProductGrid
- Persisten en DB

---

### Issue 4.2: Store Svelte pour les produits
**Type**: Feature
**Labels**: `feature`, `state-management`, `svelte-runes`, `products`
**Priority**: 🟡 Moyenne
**Description**:
Store pour gérer la liste des produits:
- `$state` pour la liste des produits
- Charger de PouchDB au démarrage
- Syncer les changements

**Tâches**:
- [ ] Créer src/lib/stores/products.svelte.ts
- [ ] Charger au startup
- [ ] Tests du store

**Acceptance Criteria**:
- Produits chargés au démarrage
- Utilisables dans ProductGrid

---

### Issue 4.3: Page de gestion des produits
**Type**: Feature
**Labels**: `feature`, `settings`, `products`, `ui`
**Priority**: 🟡 Moyenne
**Description**:
Interface de gestion des produits:
- Créer un produit (form)
- Éditer un produit
- Supprimer un produit
- Lister tous les produits (tableau ou cards)

**Tâches**:
- [ ] Créer src/routes/settings/products/+page.svelte
- [ ] Formulaire ProductForm (nouveau/éditer)
- [ ] Afficher liste des produits
- [ ] Boutons supprimer
- [ ] Tests de l'interface

**Acceptance Criteria**:
- CRUD accessible par l'UI
- Produits visibles
- Suppression fonctionne

---

### Issue 4.4: Page de paramètres généraux
**Type**: Feature
**Labels**: `feature`, `settings`, `config`
**Priority**: 🟢 Basse
**Description**:
Page des paramètres:
- Devise (EUR, USD, etc.)
- Langue (FR, EN, etc.)
- Thème (light/dark) - optionnel
- Export/Import des données
- À propos

**Tâches**:
- [ ] Créer src/routes/settings/+page.svelte
- [ ] Store pour les paramètres
- [ ] Formulaire des paramètres
- [ ] Persister en PouchDB
- [ ] Export/Import (optionnel)

**Acceptance Criteria**:
- Paramètres sauvegardés
- Devise/langue appliquées

---

## 🔄 PHASE 5: SYNC & OFFLINE

### Issue 5.1: Détection de connectivité
**Type**: Feature
**Labels**: `feature`, `sync`, `offline`, `ux`
**Priority**: 🟡 Moyenne
**Description**:
Détecter et afficher l'état de connectivité:
- Utiliser navigator.onLine
- Store Svelte pour l'état
- Afficher un petit indicateur "En ligne" / "Hors ligne"

**Tâches**:
- [ ] Créer src/lib/stores/connectivity.svelte.ts
- [ ] Implémenter la détection
- [ ] Composant d'indicateur
- [ ] Intégrer dans le header

**Acceptance Criteria**:
- Indicateur affichée
- Détection correcte

---

### Issue 5.2: Sync PouchDB vers CouchDB (optionnel)
**Type**: Feature
**Labels**: `feature`, `sync`, `replication`, `future`
**Priority**: 🟢 Basse
**Description**:
Synchronisation vers un serveur CouchDB:
- Endpoint CouchDB configurable
- Sync automatique quand online
- Gestion d'erreurs
- Indicateur de sync status

**Tâches**:
- [ ] Configurer endpoint CouchDB
- [ ] Implémenter la réplication PouchDB
- [ ] Gestion d'erreurs
- [ ] Indicateur de sync
- [ ] Tests

**Acceptance Criteria**:
- Sync fonctionne
- Données synchronisées
- Gestion d'erreurs ok

---

## 🧪 PHASE 6: TESTS & QUALITÉ

### Issue 6.1: Tests unitaires complets
**Type**: Test
**Labels**: `test`, `quality`, `unit-tests`
**Priority**: 🟡 Haute
**Description**:
Suite complète de tests unitaires:
- Tests calculations.ts: 100% coverage
- Tests stores Svelte: comportement réactif
- Tests utils: formatage, validation, etc.
- Tous les cas: décimales, zéros, négatifs, edge cases

**Tâches**:
- [ ] Tests paramétrés pour calculations
- [ ] Tests stores (add, remove, update)
- [ ] Tests utils si pertinent
- [ ] Coverage 100% sur files critiques
- [ ] `pnpm test:unit` passe

**Acceptance Criteria**:
- Coverage > 80% global
- Coverage 100% sur calculations.ts
- Tous les tests passent

---

### Issue 6.2: Tests des composants Svelte
**Type**: Test
**Labels**: `test`, `quality`, `component-tests`
**Priority**: 🟡 Moyenne
**Description**:
Tests des composants principaux:
- ProductGrid, OrderItems, ClientSwitcher
- Formulaires (ProductForm, ClientForm)
- Interaction utilisateur (clic, input, etc.)

**Tâches**:
- [ ] Tests pour composants clés
- [ ] Tests d'interaction (clic, input)
- [ ] Tests du rendu
- [ ] Tests avec Playwright browser

**Acceptance Criteria**:
- Composants clés testés
- Interactions vérifiées

---

### Issue 6.3: Tests E2E - Workflows métier
**Type**: Test
**Labels**: `test`, `quality`, `e2e-tests`
**Priority**: 🟡 Moyenne
**Description**:
Tests end-to-end des workflows:
- Ajouter un client et une commande
- Ajouter des produits
- Calculer et afficher les marges
- Valider la commande
- Consulter l'historique
- Test du offline mode

**Tâches**:
- [ ] Test workflow complet de vente
- [ ] Test offline mode
- [ ] Test multi-client
- [ ] `pnpm test:e2e` passe

**Acceptance Criteria**:
- Workflows testés de bout en bout
- Offline fonctionne en test E2E
- Tous les tests passent

---

### Issue 6.4: Tests de performance et accessibilité
**Type**: Test
**Labels**: `test`, `quality`, `a11y`, `performance`
**Priority**: 🟢 Moyenne
**Description**:
Tests de performance et accessibilité:
- Lighthouse score
- Axe accessibility scan
- Performance metrics (LCP, FID, CLS)
- Tests sur mobiles anciens si possible

**Tâches**:
- [ ] Lighthouse audit
- [ ] Axe accessibility test
- [ ] Performance profiling
- [ ] Optimisations si nécessaire

**Acceptance Criteria**:
- Lighthouse > 85
- Accessibilité WCAG AA
- Performance acceptable

---

## 📦 PHASE 7: POLISH & DOCUMENTATION

### Issue 7.1: Design responsive - Mobile, Tablet, Desktop
**Type**: Enhancement
**Labels**: `enhancement`, `ux`, `responsive`
**Priority**: 🟡 Haute
**Description**:
Assurer le design responsive complet:
- Tests sur iOS Safari (si possible)
- Tests sur Chrome Android
- Tests sur tablets
- Tests sur desktop
- Optimisations de layout si nécessaire

**Tâches**:
- [ ] Tests sur appareils réels/émulés
- [ ] Ajustements de layout
- [ ] Tests de touch
- [ ] Débugger avec DevTools mobile

**Acceptance Criteria**:
- App parfaitement responsive
- Fonctionne sur tous les écrans

---

### Issue 7.2: Optimisation des performances
**Type**: Enhancement
**Labels**: `enhancement`, `performance`, `optimization`
**Priority**: 🟡 Moyenne
**Description**:
Optimiser les performances:
- Code splitting si pertinent
- Image optimization
- Lazy loading
- Bundle size analysis
- Caching strategy

**Tâches**:
- [ ] Profiling et mesure
- [ ] Bundle analysis
- [ ] Optimisations
- [ ] Re-mesurer

**Acceptance Criteria**:
- Bundle size raisonnable
- Performance score élevé

---

### Issue 7.3: Polish de l'UI/UX
**Type**: Enhancement
**Labels**: `enhancement`, `ux`, `ui`
**Priority**: 🟡 Moyenne
**Description**:
Peaufiner l'interface:
- Animations/transitions fluides
- Toast notifications pour les actions
- États vides (pas de clients, pas de produits)
- États de chargement si pertinent
- Feedback utilisateur clair

**Tâches**:
- [ ] Ajouter transitions/animations
- [ ] Toast notifications (Skeleton Labs)
- [ ] States vides
- [ ] Feedback pour chaque action
- [ ] Tester l'expérience utilisateur

**Acceptance Criteria**:
- UI polie et cohérente
- Bon feedback utilisateur
- Agréable à utiliser

---

### Issue 7.4: Documentation utilisateur
**Type**: Documentation
**Labels**: `docs`, `user-guide`
**Priority**: 🟢 Moyenne
**Description**:
Documentation pour les utilisateurs:
- Guide de démarrage (5 minutes)
- Comment ajouter un client
- Comment ajouter une commande
- FAQ
- Troubleshooting

**Tâches**:
- [ ] Créer docs/USER_GUIDE.md
- [ ] Rédiger guide simple
- [ ] Ajouter screenshots
- [ ] FAQ basée sur use cases

**Acceptance Criteria**:
- Documentation claire
- Couvre les use cases

---

### Issue 7.5: Documentation développeur
**Type**: Documentation
**Labels**: `docs`, `developer-guide`
**Priority**: 🟢 Basse
**Description**:
Documenter pour les devs:
- Architecture globale
- Structure PouchDB
- API des stores
- Patterns utilisés
- Guide de contribution

**Tâches**:
- [ ] Créer docs/ARCHITECTURE.md
- [ ] Documenter les stores
- [ ] Documenter PouchDB
- [ ] Exemples de code

**Acceptance Criteria**:
- Documentation complète
- Facile à maintenir

---

## 🚀 PHASE 8: DÉPLOIEMENT & RELEASE

### Issue 8.1: Déploiement Cloudflare final
**Type**: DevOps
**Labels**: `devops`, `deployment`, `cloudflare`
**Priority**: 🟡 Haute
**Description**:
Finaliser et déployer sur Cloudflare:
- Tester le build production
- Configurer domaine custom
- Vérifier SSL/TLS
- Service worker fonctionne
- PWA installable
- Monitoring basique

**Tâches**:
- [ ] `pnpm build` production
- [ ] Tester le build
- [ ] Déployer sur Cloudflare Pages
- [ ] Configurer domaine
- [ ] Tester offline en production
- [ ] Vérifier PWA

**Acceptance Criteria**:
- Déploiement réussit
- App accessible publiquement
- PWA fonctionnelle
- Offline marche

---

### Issue 8.2: Préparation release v1.0
**Type**: Release
**Labels**: `release`, `version`
**Priority**: 🟡 Moyenne
**Description**:
Préparer la première release:
- CHANGELOG.md complète
- Version bumping (semantic versioning)
- Git tag v1.0.0
- Release notes

**Tâches**:
- [ ] Rédiger CHANGELOG.md
- [ ] Versionner en 1.0.0
- [ ] Git tag v1.0.0
- [ ] Release notes

**Acceptance Criteria**:
- Release prête à être annoncée

---

## 📊 Résumé des Issues

| Phase | # | Titre | Priorité | Effort |
|-------|---|-------|----------|--------|
| **SETUP** | 0.1 | PouchDB + Types | 🔴 Critique | Medium |
| | 0.2 | Structure projet | 🟡 Haute | Low |
| | 0.3 | PWA + Service Worker | 🟡 Haute | Medium |
| | 0.4 | Env variables | 🟡 Moyenne | Low |
| | 0.5 | Cloudflare config | 🟡 Moyenne | Low |
| | 0.6 | GitHub Actions | 🟡 Basse | Medium |
| **MVP** | 1.1 | Types métier | 🔴 Critique | Low |
| | 1.2 | Logique calculs + tests | 🔴 Critique | Medium |
| | 1.3 | Store commande (Runes) | 🔴 Critique | Medium |
| | 1.4 | ProductForm | 🔴 Haute | Medium |
| | 1.5 | ProductGrid | 🔴 Critique | Medium |
| | 1.6 | OrderItems | 🔴 Haute | Medium |
| | 1.7 | Main layout | 🔴 Haute | Medium |
| **CLIENTS** | 2.1 | Store clients | 🟡 Critique | Medium |
| | 2.2 | CRUD Clients DB | 🟡 Critique | Low |
| | 2.3 | CRUD Orders DB | 🟡 Critique | Low |
| | 2.4 | ClientForm | 🟡 Moyenne | Low |
| | 2.5 | ClientSwitcher | 🟡 Haute | Low |
| | 2.6 | Persistance commande | 🟡 Moyenne | Low |
| **HISTOIRE** | 3.1 | Terminer commande | 🟡 Haute | Low |
| | 3.2 | Page historique | 🟡 Moyenne | Medium |
| | 3.3 | Statistiques | 🟢 Basse | Low |
| | 3.4 | Graphiques | 🟢 Basse | Medium |
| **CONFIG** | 4.1 | CRUD Produits DB | 🟡 Moyenne | Low |
| | 4.2 | Store produits | 🟡 Moyenne | Low |
| | 4.3 | Page gestion produits | 🟡 Moyenne | Medium |
| | 4.4 | Page paramètres | 🟢 Basse | Medium |
| **SYNC** | 5.1 | Détection connectivité | 🟡 Moyenne | Low |
| | 5.2 | Sync CouchDB | 🟢 Basse | Medium |
| **TESTS** | 6.1 | Tests unitaires | 🟡 Haute | High |
| | 6.2 | Tests composants | 🟡 Moyenne | Medium |
| | 6.3 | Tests E2E | 🟡 Moyenne | Medium |
| | 6.4 | Tests perf/a11y | 🟢 Moyenne | Medium |
| **POLISH** | 7.1 | Design responsive | 🟡 Haute | Medium |
| | 7.2 | Optimisation perf | 🟡 Moyenne | Medium |
| | 7.3 | Polish UI/UX | 🟡 Moyenne | Medium |
| | 7.4 | Doc utilisateur | 🟢 Moyenne | Medium |
| | 7.5 | Doc développeur | 🟢 Basse | Low |
| **RELEASE** | 8.1 | Déploiement Cloudflare | 🟡 Haute | Low |
| | 8.2 | Release v1.0 | 🟡 Moyenne | Low |

---

## 🎯 Chemin Critique Recommandé

```
PHASE 0: Setup Restant
  ↓
PHASE 1: MVP (Core calculations)
  ↓
PHASE 2: Multi-Client Management
  ↓
PHASE 3: History & Stats (optionnel 3.3-3.4)
  ↓
PHASE 4: Settings & Products
  ↓
PHASE 5: Sync & Offline
  ↓
PHASE 6: Tests (run alongside phases 1-5)
  ↓
PHASE 7: Polish
  ↓
PHASE 8: Deploy & Release
```

---

## 📝 Recommandations

- **Tester souvent** sur mobile réel durant le développement
- **Mobile-first toujours**: concevoir pour mobile d'abord
- **PouchDB est critique**: bien la maîtriser avant de progresser
- **Types TypeScript**: aucun `any`, créer les interfaces
- **Tests importants**: couvrir au moins les calculs et workflows critiques
- **Documentation**: documenter au fur et à mesure, pas à la fin
