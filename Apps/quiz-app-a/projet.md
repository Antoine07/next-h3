# TP — Quiz App (binôme) : API CRUD + score

## Contexte

Vous devez réaliser **une application de Quiz** similaire à l'application de démonstration (navigation quiz → questions → choix → score), mais le point central évalué est **le CRUD dans l'API** (pas dans l'interface).

Travail **en binôme** (pair-programming recommandé).

---

## Objectifs pédagogiques

* Comprendre et implémenter un **CRUD complet** via une API (routes, méthodes HTTP, statuts, validation).
* Concevoir un **schéma de base de données relationnelle** cohérent (relations, clés, cascades).
* Consommer l'API depuis une application web (pages, état, navigation).
* Comprendre et **expliquer le déploiement** d'une application web (front + API).
* Présenter un projet : démarche, choix techniques, démonstration, recul.

---

## Fonctionnalités attendues (MVP)

### Base de données (obligatoire)

Au minimum, modéliser ces entités :

* `quiz` (titre, description, …)
* `question` (libellé, …)
* `choice` (libellé, booléen "bonne réponse", …)

Attendus :

* Relations 1→N : un quiz a plusieurs questions ; une question a plusieurs choix.
* Intégrité : éviter les données "orphelines", expliquer le choix de la cascade dans le projet.

---

### API  — CRUD à expliquer en soutenance

Vous devez présenter le CRUD de la ressource suivante :

* `quiz`

Pour cette ressource, vous devez couvrir :

* `GET` (liste)
* `GET` (détail)
* `POST` (création)
* `PUT` ou `PATCH` (mise à jour)
* `DELETE` (suppression)

Attendus :

* Expliquez les **bons codes HTTP** (`200 / 201 / 204 / 400 / 404 / 500…`) et être capables de les expliquer.
* Éviter l'injection SQL (requêtes paramétrées / ORM).
* Gérer les erreurs proprement (réponse JSON structurée).

---

### Application Quiz 

Reproduire le parcours utilisateur :

* Page d'accueil (accès à la liste des quiz).
* Liste des quiz (carte/bouton "faire le quiz").
* Détail d'un quiz (titre/description + bouton "commencer").
* Parcours des questions une par une (choix unique).
* Fin de quiz : **affichage du score**.

---

Voici une **mise en forme claire, propre et pédagogique**, prête à intégrer dans le TP.

---

### D) Score

#### Score d'un quiz (obligatoire)

Vous devez afficher un **score pour un quiz donné**, au minimum **à la fin du quiz**.

---

#### Score par quiz dans la liste (facultatif)

En plus du score affiché à la fin d'un quiz, vous pouvez, **si vous le souhaitez**, choisir **une** manière d'afficher le **score de chaque quiz dans la liste**, par exemple :

* **Dernier score** sauvegardé côté client (`localStorage`)
* **Score persisté côté serveur** (table de résultats + endpoint dédié)
* **Autre solution pertinente**, à condition qu'elle soit justifiée

---

#### Attendus (si cette partie est réalisée)

Vous devez être capables **d'expliquer clairement** :

* où est stockée l'information,
* quand elle est calculée,
* comment elle est récupérée et affichée.

**Cette partie est facultative** et **n'est pas pénalisante** si elle n'est pas réalisée.
Elle permet uniquement de **valoriser un travail plus avancé**.

---
Voici une **reformulation claire, sans ambiguïté**, qui indique explicitement que le **déploiement doit être documenté et expliqué, mais pas nécessairement réalisé**.

Vous pouvez l'intégrer telle quelle.

---

### Déploiement (obligatoire — **documentation et explication attendues**)

Le déploiement de l'application **n'est pas obligatoire à réaliser**, mais **il doit être documenté et expliqué**.

Vous devez être capables de décrire **comment l'application serait déployée**, en précisant :

* **Où** l'application serait déployée (plateforme choisie).
* **Comment** se déroulerait le déploiement :

  * phase de build,
  * gestion des variables d'environnement,
  * lancement de l'application.
* **Ce qui serait déployé** :

  * front seul,
  * API seule,
  * ou front + API ensemble.
* **Quelles contraintes techniques** cela implique :

  * base de données,
  * variables d'environnement,
  * ports,
  * CORS,
  * limitations éventuelles de la plateforme.

Le déploiement est évalué **uniquement sur la compréhension et la capacité à l'expliquer**,
et **non sur sa réalisation effective ni sur la complexité de l'infrastructure**.

---

## Contraintes

* Projet réalisé à deux : répartition claire (mais chacun doit comprendre l'ensemble).
* Vous devez pouvoir démontrer l'API via un outil type Postman/Insomnia.
* Pas d'auth obligatoire (sauf si vous voulez aller plus loin).
* Pas de copier-coller "aveugle" : vous devez comprendre ce que vous présentez.

---

## Livrables

1. **Code** (repo Git) : application + API + base de données.
2. **Dossier (4 pages max, PDF)** : clair, illustré si utile.
3. **Extrait de code** (1 fichier / 1 fonction / 1 composant) jugé intéressant, à expliquer.

---

### Contenu attendu du dossier (4 pages max)

Organisation conseillée :

1. **Équipe & objectif** : répartition, périmètre MVP.
2. **Schéma de BDD** : tables, relations, contraintes.
3. **API CRUD** : endpoints (méthode + URL + rôle), exemples de payloads.
4. **Application & déploiement** :

   * parcours utilisateur,
   * choix techniques,
   * principe de déploiement,
   * difficultés rencontrées,
   * améliorations possibles.

---

## Soutenance (20 minutes par groupe)

Ordre imposé : **API → BDD → App → Déploiement**.

Découpage recommandé :

* 0–2 min : équipe, objectif, périmètre.
* 2–10 min : **API CRUD** (routes, validations, statuts, erreurs).
* 10–14 min : base de données (schéma + cohérence).
* 14–17 min : application (parcours + score).
* 17–19 min : **déploiement** (où, comment, contraintes).
* 19–20 min : extrait de code + conclusion.

---

## Grille de notation (/20)

* **CRUD API fonctionnel & cohérent (/7)**
* **Qualité des données & schéma BDD (/4)**
* **Parcours Quiz & UX (/4)**
* **Score "par quiz" (/2)**
* **Qualité de code & organisation (/2)**
* **Dossier + déploiement expliqué (/1)**
