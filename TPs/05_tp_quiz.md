# TP — CRUD des quizzes

Attention ce TP est déterminant pour finaliser le projet qui sera noté. 

Je reste pendant ces deux prochaines semaines disponible pour finaliser votre projet en dehors de nos cours.

Pour la validation des données utilisateurs, vous pouvez utiliser `zod`, c'est en option.

## Partie 1 CRUD 

Créer une API CRUD pour le projet `quizzes` :

* `GET /api/quizzes` (liste)
* `GET /api/quizzes/:quizId` (détail)
* `POST /api/quizzes` (création)
* `PUT /api/quizzes/:quizId` (mise à jour)
* `DELETE /api/quizzes/:quizId` (suppression)

## Rappel des contraintes

* Base `quiz_app` avec tables : `users`, `quizzes`, `questions`
* `mysql2` installé
* Un `db` exporté depuis `@/lib/db`

Si vous avez des fonctions "utiles" vous pouvez créez un fichier utils.js dans le dossier `lib`, si vous le souhaitez.

---

## Préparer la structure Next.js pour l'API 

Créer :

```
app/api/quiz/route.js
app/api/quiz/[quizId]/route.js
lib/db.js
```

---

## Connexion DB (pool)

Dans `lib/db.js`, créer un pool `mysql2/promise` et l'exporter en `db`.

Critères :

* `createPool`
* variables d'env
* `connectionLimit`

---

## GET all (liste des quizzes)

Dans `app/api/quizzes/route.js` :

* écrire `export async function GET()`
* requête SQL :

```sql
SELECT id, user_id, title, description FROM quizzes
```

* retourner `NextResponse.json(rows)`
* `try/catch` et `500` en cas d'erreur

---

##  POST (création quiz)

Dans `app/api/quizzes/route.js` :

* écrire `export async function POST(request)`
* lire `request.json()`
* vérifier `user_id`, `title` présents
* insertion SQL :

```sql
INSERT INTO quizzes (user_id, title, description) VALUES (?, ?, ?)
```

* retourner `{ id: result.insertId }` et status `201`

---

##  GET by id

Dans `app/api/quizzes/[quizId]/route.js` :

* écrire `export async function GET(_request, { params })`
* récupérer `params.quizId`
* vérifier quizId
* requête SQL avec `WHERE id = ?`
* si `rows[0]` absent → `404`

---

##  PUT (update)

Dans `app/api/quizzes/[quizId]/route.js` :

* écrire `export async function PUT(request, { params })`
* vérifier `quizId`
* lire body `{ title, description }`
* requête SQL :

```sql
UPDATE quizzes SET title = ?, description = ? WHERE id = ?
```

* si `affectedRows === 0` → `404`
* sinon `{ success: true }`

---

## DELETE (suppression)

Dans `app/api/quizzes/[quizId]/route.js` :

* écrire `export async function DELETE(_request, { params })`
* requête SQL :

```sql
DELETE FROM quizzes WHERE id = ?
```

* si `affectedRows === 0` → `404`
* sinon `{ success: true }`

---

##  Tests avec Insomnia (obligatoire)

Créer 5 requêtes :

* GET `/api/quiz`
* POST `/api/quiz`
* GET `/api/quiz/1`
* PUT `/api/quiz/1`
* DELETE `/api/quiz/1`

---


| Requête HTTP | URL           | Action             | Statut attendu        | Réponse JSON attendue |
| ------------ | ------------- | ------------------ | --------------------- | --------------------- |
| GET          | `/api/quiz`   | Lister les quizzes | `200`                 | Tableau de quizzes    |
| POST         | `/api/quiz`   | Créer un quiz      | `201`                 | `{ "id": number }`    |
| GET          | `/api/quiz/1` | Lire un quiz       | `200` ou `404`        | Objet quiz ou erreur  |
| PUT          | `/api/quiz/1` | Modifier un quiz   | `200` / `400` / `404` | `{ "success": true }` |
| DELETE       | `/api/quiz/1` | Supprimer un quiz  | `200` ou `404`        | `{ "success": true }` |


---

**À retenir :**

- le statut HTTP dit si ça marche

- le JSON contient les données ou l'erreur

- chaque endpoint doit être testable indépendamment

---

## les Rendus attendus

* les 2 fichiers `route.js` complets
* capture des tests Insomnia (ou export workspace)
* SQL utilisé (copié dans un fichier `notes.md`)

---

# Partie 2 -  Jouer un quiz étape par étape + enregistrer un résultat 

## Objectif

Créer le flux "jouer un quiz" :

1. récupérer un quiz + ses questions
2. répondre question par question
3. calculer un score
4. enregistrer un résultat en base

---

## Nouvelle table `quiz_results`

Créer une nouvelle table `quiz_results` dans `quiz_app` :

Champs obligatoires :

* `id` (PK)
* `quiz_id` (FK → quizzes.id, cascade)
* `user_id` (FK → users.id, cascade)
* `score` (INT)
* `total` (INT)
* `created_at` (timestamp)

Contraintes :

* `quiz_id` NOT NULL
* `user_id` NOT NULL
* `score >= 0`
* `total > 0`

---

## Endpoint pour récupérer un quiz "jouable"

Créer :

```
app/api/quizzes/[quizId]/play/route.js
```

Le GET doit retourner :

* quiz : `id, title, description`
* questions : `id, label`

SQL attendu :

* 1 requête quiz
* 1 requête questions (par `quiz_id`)

Format JSON attendu :

```json
{
  "quiz": { "id": 1, "title": "...", "description": "..." },
  "questions": [
    { "id": 10, "label": "..." }
  ]
}
```

---

## Logique "étape par étape" côté app (sans UI complexe)

Créer une page (ou composant) qui gère :

* `currentIndex`
* `answers[]`
* `isFinished`
* `next()`, `previous()` (optionnel)

Critères :

* une seule question visible
* stockage des réponses en mémoire
* pas de rechargement complet

---

## Endpoint de soumission du quiz

Créer :

```
app/api/quizzes/[quizId]/submit/route.js
```

`POST` reçoit :

* `user_id`
* `answers` (tableau)

Exemple :

```json
{
  "user_id": 1,
  "answers": [
    { "question_id": 10, "value": "..." }
  ]
}
```

Pour l'instant (version sans choices), le score peut être :

* `score = answers.length`
* `total = nombre de questions`

But : valider le pipeline complet.

---

## Enregistrer le résultat

Dans le `POST submit` :

1. récupérer `total` (count questions du quiz)
2. calculer score (règle simple)
3. insérer dans `quiz_results`

SQL :

```sql
INSERT INTO quiz_results (quiz_id, user_id, score, total)
VALUES (?, ?, ?, ?)
```

Retour API :

```json
{
  "result_id": 5,
  "score": 3,
  "total": 4
}
```

---

## Endpoint pour lire les résultats d'un quiz

Créer :

```
app/api/quizzes/[quizId]/results/route.js
```

GET retourne la liste des résultats :

* `id, user_id, score, total, created_at`

---

## Tests Insomnia 

* GET `/api/quizzes/1/play`
* POST `/api/quizzes/1/submit`
* GET `/api/quizzes/1/results`

Critères :

* un résultat est bien inséré
* le retour affiche score/total
* le GET results retrouve l'entrée

---

## Rendus attendus pour la partie 2

* SQL création table `quiz_results`
* les 3 nouveaux endpoints (`play`, `submit`, `results`)
* une page ou script qui simule le quiz étape par étape
* captures de tests Insomnia
