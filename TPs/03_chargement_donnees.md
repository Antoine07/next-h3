# TP — Charger des quiz via une API interne avec `fetch`

## Objectif du TP

À l'issue de ce TP, vous serez capables de :

* créer des routes API internes avec Next.js
* utiliser `fetch` pour charger des données côté serveur
* structurer une application prête pour une base MySQL
* séparer clairement pages, API et accès aux données

---

## Contexte

L'application de quiz va prochainement utiliser une **base de données MySQL**.
Dans ce TP, les données restent locales, mais l'architecture doit être **identique à celle utilisée avec une vraie base de données**.

---

## Architecture attendue

```txt
Page (Server Component)
   ↓ fetch
API interne Next.js
   ↓
Accès aux données (JSON aujourd'hui, MySQL demain)
```

---

## Données de quiz (simulation base)

Créer une source de données locale représentant une future table MySQL.

Chaque quiz doit contenir :

* `id`
* `title`
* `description`
* `isActive`

Les données doivent être stockées dans un fichier dédié.

---

##  Accès centralisé aux données

Créer un module d'accès aux données (repository).

Ce module doit :

* exposer une fonction pour récupérer tous les quiz actifs
* exposer une fonction pour récupérer un quiz par ID
* contenir **toute la logique d'accès aux données**

👉 Les pages et les routes API ne doivent **jamais** accéder directement aux données.

---

## Routes API internes

Créer des routes API Next.js permettant :

1. de récupérer la liste des quiz
2. de récupérer le détail d'un quiz

Contraintes :

* les routes doivent renvoyer du JSON
* elles doivent utiliser le repository
* elles ne doivent contenir aucune logique d'interface

---

##  Chargement des quiz avec `fetch`

Dans la page `/quiz` :

* utiliser `fetch` pour appeler l'API interne
* charger la liste des quiz côté serveur
* afficher les quiz à l'aide des composants UI existants

---

## Chargement d'un quiz spécifique

Dans la page `/quiz/[id]` :

* récupérer l'ID depuis l'URL
* utiliser `fetch` pour appeler l'API correspondante
* afficher les informations du quiz
* gérer le cas “quiz introuvable”
