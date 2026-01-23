# Détail des routes API (Next.js App Router) + tests Postman

Ce document décrit **toutes les routes** présentes dans `src/app/api` et comment les tester avec Postman.

## 0) Comprendre le “file-based routing” de Next.js (App Router)

Dans Next.js (App Router), une route API est un fichier `route.js` placé sous `src/app/api/...`.

Exemples dans ce projet :
- `src/app/api/quiz/route.js` → `/api/quiz`
- `src/app/api/quiz/[quizId]/route.js` → `/api/quiz/:quizId` (segment dynamique)

Chaque handler exporte des fonctions nommées selon la méthode HTTP :
- `export async function GET(...) { ... }`
- `export async function POST(...) { ... }`
- etc.

> Dans l’état actuel du code, **seules des routes `GET` sont implémentées**. Un `POST /api/quiz` renverra donc `405 Method Not Allowed`.

## 1) Pré-requis (pour que l’API réponde)

### Base de données
Le projet utilise MySQL via `mysql2/promise` (pool) dans `src/lib/db.js`.

Variables d’environnement attendues :
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

Schéma + données d’exemple : `src/data/init_database.sql`.

### Lancer l’application
En local :
- `npm run dev`
- l’API répond sur `http://localhost:3000/api/...`

> Note : certaines pages utilisent `APP_URL` via `src/lib/getBaseUrl.js`, mais **les routes API** sont appelables directement via l’URL du serveur.

---

## 2) Modèle de données (à connaître pour comprendre les réponses)

Extrait du schéma (`src/data/init_database.sql`) :

### Table `quiz`
- `id` (INT, auto-incrément, PK)
- `user_id` (INT, nullable)
- `title` (VARCHAR, obligatoire)
- `description` (TEXT, optionnel)

### Table `question`
- `id` (INT, auto-incrément, PK)
- `quiz_id` (INT, FK → `quiz.id`)
- `label` (TEXT, obligatoire)

### Table `choice`
- `id` (INT, auto-incrément, PK)
- `question_id` (INT, FK → `question.id`)
- `label` (TEXT, obligatoire)
- `is_correct` (BOOLEAN, default `false`)

Relations :
- 1 quiz → N questions (`question.quiz_id`)
- 1 question → N choices (`choice.question_id`)

---

## 3) Setup Postman (recommandé)

### Environnement Postman
Crée un environnement Postman avec :
- `baseUrl` = `http://localhost:3000`

Dans tes requêtes, utilise :
- `http://localhost:3000/api/...`

### Headers
Pour ces routes **GET**, aucun header n’est obligatoire.

---

## 4) Routes disponibles

### 4.1 GET `/api/quiz` — lister tous les quiz
**Fichier** : `src/app/api/quiz/route.js`

**Description**
- Retourne la liste complète des quiz (`SELECT * FROM quiz`).

**Requête (Postman)**
- Method: `GET`
- URL: `http://localhost:3000/api/quiz`

**Réponse 200 (exemple)**
```json
[
  {
    "id": 1,
    "user_id": null,
    "title": "Quiz Jazz",
    "description": null
  }
]
```

**Erreurs possibles**
- Si la base est inaccessible, Next.js renverra une erreur serveur (souvent `500`). Cette route n’a pas de `try/catch` explicite.

---

### 4.2 GET `/api/quiz/:quizId` — récupérer un quiz par id
**Fichier** : `src/app/api/quiz/[quizId]/route.js`

**Description**
- Cherche un quiz par `id` (requête SQL avec paramètre `?`).
- Le code sélectionne : `id, user_id, title, description`.

**Paramètres**
- `quizId` (path param) : entier (ex: `1`)

**Requête (Postman)**
- Method: `GET`
- URL: `http://localhost:3000/api/quiz/1`

**Réponse 200 (comportement actuel)**
Le handler renvoie **un tableau** (même si on attend souvent “un objet”) :
```json
[
  {
    "id": 1,
    "user_id": null,
    "title": "Quiz Jazz",
    "description": null
  }
]
```

**Cas “introuvable” (comportement actuel)**
Si `quizId` n’existe pas, la réponse est généralement :
```json
[]
```

**Note pédagogique (important)**
Le code tente de renvoyer `404` (`Quiz not found`) mais, tel qu’écrit, la condition ne se déclenche pas car un tableau vide `[]` est “truthy” en JavaScript.

**Erreurs**
- `400` si `quizId` est manquant (cas rare via HTTP, car le segment d’URL existe si la route est appelée).
- `500` si exception (le handler a un `try/catch`).

---

### 4.3 GET `/api/quiz/:quizId/questions` — lister les questions d’un quiz
**Fichier** : `src/app/api/quiz/[quizId]/questions/route.js`

**Description**
- Retourne toutes les questions liées à un quiz (`SELECT * FROM question WHERE quiz_id = ?`).

**Paramètres**
- `quizId` (path param) : entier

**Requête (Postman)**
- Method: `GET`
- URL: `http://localhost:3000/api/quiz/1/questions`

**Réponse 200 (exemple)**
```json
[
  {
    "id": 1,
    "quiz_id": 1,
    "label": "Qui est considéré comme un pionnier du jazz ?"
  }
]
```

**Cas “introuvable”**
- Si le quiz n’existe pas **ou** s’il n’a pas de questions, le comportement actuel renverra souvent `[]`.

**Erreurs**
- `400` si `quizId` est manquant.
- `500` si exception.

---

### 4.4 GET `/api/question/:questionId/choices` — lister les choix d’une question
**Fichier** : `src/app/api/question/[questionId]/choices/route.js`

**Description**
- Retourne les choix d’une question (`SELECT * FROM choice WHERE question_id = ?`).

**Paramètres**
- `questionId` (path param) : entier

**Requête (Postman)**
- Method: `GET`
- URL: `http://localhost:3000/api/question/1/choices`

**Réponse 200 (exemple)**
```json
[
  {
    "id": 1,
    "question_id": 1,
    "label": "Louis Armstrong",
    "is_correct": 1
  }
]
```

**Remarques**
- Avec MySQL, `BOOLEAN` est souvent représenté comme `0/1` dans les résultats.

**Cas “introuvable”**
- Si `questionId` n’existe pas (ou aucune choice), le comportement actuel renverra souvent `[]`.

**Erreurs**
- `400` si `questionId` est manquant.
- `500` si exception.

---


## 6) Atelier Postman (parcours complet “Quiz → Questions → Choices”)

Objectif : reproduire le flux d’une appli qui affiche un quiz, puis ses questions, puis les choix de chaque question.

1) Lister les quiz
- `GET http://localhost:3000/api/quiz`
- Choisir un `id` (ex: `1`)

2) Récupérer le quiz
- `GET http://localhost:3000/api/quiz/1`

3) Récupérer les questions du quiz
- `GET http://localhost:3000/api/quiz/1/questions`
- Choisir un `questionId` (ex: `1`)

4) Récupérer les choices de la question
- `GET http://localhost:3000/api/question/1/choices`

### Option (niveau +) : chaîner automatiquement dans Postman
Tu peux stocker des variables d’environnement depuis l’onglet **Tests** :

- Sur `GET /api/quiz` (Tests) :
```js
pm.environment.set("quizId", pm.response.json()[0].id);
```

- Sur `GET /api/quiz/:quizId/questions` (Tests) :
```js
pm.environment.set("questionId", pm.response.json()[0].id);
```

Puis utiliser :
- `GET http://localhost:3000/api/quiz/{{quizId}}`
- `GET http://localhost:3000/api/quiz/{{quizId}}/questions`
- `GET http://localhost:3000/api/question/{{questionId}}/choices`
