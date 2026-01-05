# Projet — Application de quiz pédagogique avec Next.js

## Contexte général

Une organisation de formation souhaite disposer d'une **application web de quiz pédagogiques** permettant aux apprenants de tester leurs connaissances après chaque module de cours.
L'application doit être **performante**, **maintenable** et conçue selon les bonnes pratiques de **Next.js (App Router)**.

Le projet est développé de manière **incrémentale**, en suivant une **logique produit**.

Vous êtes libre concernant le design de l'application. En revanche, vous devez **respecter la structuration attendue d'une application Next.js**.

Un **dossier de conception** (format libre) devra être fourni avec l'application.
Le **code source final** devra être livré à la fin du projet.

L'utilisation de **Git** et d'un **dépôt distant** est obligatoire.
Un **Gitflow minimal** devra être mis en place.

## Démonstration

![démo QCM](./assets/qcm.gif)

---

## User story principale

> **En tant qu'apprenant**,
> je souhaite accéder à une plateforme de quiz en ligne,
> afin de sélectionner un quiz, répondre aux questions, suivre ma progression et consulter mon score final.

---

## Déclinaison en user stories fonctionnelles

---

### US1 — Accéder à l'application et comprendre son objectif (Séances 10–11)

> **En tant qu'utilisateur**,
> je souhaite accéder à une page d'accueil claire et structurée,
> afin de comprendre l'objectif de l'application et naviguer facilement vers les quiz.

**Critères d'acceptation**

* Application initialisée avec **Next.js App Router**
* Layout global commun à toutes les pages
* Page d'accueil accessible via `/`
* Structure de dossiers claire et évolutive
* Présence de **données de quiz factices** dans l'application

---

### US2 — Naviguer vers la liste des quiz (Séances 12–13)

> **En tant qu'utilisateur**,
> je souhaite consulter une liste de quiz disponibles,
> afin de choisir celui que je souhaite réaliser.

**Critères d'acceptation**

* Route `/quiz` accessible depuis la navigation
* Liste de quiz affichée (d'abord en données statiques, puis dynamiques)
* Navigation fonctionnelle via le composant `Link`
* Routes dynamiques `/quiz/[id]` mises en place

---

### US3 — Charger et afficher les données des quiz (Séances 14–15)

> **En tant qu'utilisateur**,
> je souhaite que les quiz affichent leurs questions et réponses réelles,
> afin de pouvoir passer un quiz complet.

**Critères d'acceptation**

* Données chargées depuis un fichier JSON local
* Utilisation des **Server Components** et de `fetch`
* Mise en place d'une base de données **MySQL** (entités définies)
* Présentation d'un mécanisme de récupération de données persistantes
* Page `/quiz/[id]` connectée à ses données

---

### US4 — Répondre à un quiz et suivre sa progression (Séances 16–17)

> **En tant qu'utilisateur**,
> je souhaite répondre aux questions d'un quiz et suivre ma progression,
> afin de connaître mon score final.

**Critères d'acceptation**

* Gestion de l'état global avec **Zustand**
* Suivi de la question courante
* Calcul du score
* Affichage du résultat final
* Persistance optionnelle via le stockage local

---

### US5 — Bénéficier d'une interface claire et moderne (Séances 18–19)

> **En tant qu'utilisateur**,
> je souhaite une interface agréable et cohérente,
> afin de me concentrer sur le contenu du quiz.

**Critères d'acceptation**

* Styling structuré avec **Tailwind CSS**
* Cohérence visuelle entre les pages
* Page de quiz finalisée graphiquement
* Route API interne simple (`/api/hello`) consommée dans l'interface
* Page `/history` affichant l'historique des scores

---

### US6 — Présenter une application prête à être déployée (Séance 20)

> **En tant que développeur**,
> je souhaite livrer une application structurée, documentée et déployable,
> afin de démontrer la maîtrise de Next.js et d'une architecture moderne.

**Critères d'acceptation**

* Structure de code claire et justifiée
* Séparation logique des responsabilités
* Utilisation cohérente de **Next.js**, **Zustand**, **Tailwind CSS** et des **API routes**
* Application fonctionnelle et testée manuellement
* Présentation orale argumentée (architecture, choix techniques)
