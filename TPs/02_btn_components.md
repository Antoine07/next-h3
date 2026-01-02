## TP — Navigation et composants : afficher le détail d'un quiz

### Objectif pédagogique

Ce TP vise à consolider :

* l'organisation du projet (pages, components, ui)
* la réutilisation des composants
* la navigation entre pages
* la compréhension du rôle des composants dans l'interface

---

## Contexte

La page `/quiz` affiche une liste de quiz.
L'utilisateur doit pouvoir **cliquer sur un bouton** pour accéder à la page de détail d'un quiz (`/quiz/[id]`).

---

## Organisation des composants

* Créer un dossier `ui/` pour les composants purement visuels
* Créer un dossier `components/` pour les composants génériques
* Identifier ce qui relève :

  * du rendu (UI)
  * de la structure (components)
  * de la page (routing)

---

## Bouton de navigation

* Créer un composant bouton réutilisable
* Le bouton doit permettre d'accéder au détail d'un quiz
* La navigation doit respecter la structure des routes existantes

---

## Carte de quiz

* Créer un composant représentant un quiz (titre, description, action)
* Ce composant doit utiliser le bouton de navigation
* Le composant doit être réutilisable

---

## Utilisation dans la page `/quiz`

* La page `/quiz` doit :

  * récupérer la liste des quiz
  * afficher chaque quiz via le composant dédié
* La page doit rester lisible et courte

---

## Page de détail d'un quiz

* La page `/quiz/[id]` doit :

  * récupérer l'identifiant depuis l'URL
  * afficher un contenu cohérent avec l'ID
* Un lien ou bouton “Retour à la liste” est attendu

---

## Option (facultatif)

Il est possible, **sans obligation**, d'utiliser :

* `useState` pour gérer une interaction simple (ex. état d'affichage)
* `useEffect` pour déclencher un effet lié à l'affichage

➡️ Cette option ne doit pas alourdir la structure du projet.

---

## Contraintes

* Pas de base de données
* Pas de fetch externe
* Logique simple et lisible
* Respect strict de l'organisation des dossiers
