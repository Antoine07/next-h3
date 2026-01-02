---
marp: true
theme: default
paginate: true
class: lead
---

# Gestion des données avec Next.js

---

## Principe fondamental

Avec le **App Router** :

> Les données sont chargées **avant le rendu**,
> directement **dans les composants serveur**.

On ne charge plus les données *après* l'affichage comme dans une SPA classique.

---

## Server Components par défaut

Dans `app/` :

- les composants sont **Server Components**
- le code s'exécute **côté serveur**
- on peut appeler `fetch()` directement

Pas besoin de :

- `useEffect`
- `useState`
- librairie externe

---

## Nuance importante : `"use client"` un tag qu'il faut bien comprendre

Dans le dossier `app/` :

- tous les fichiers sont des **Server Components par défaut**
- le code s'exécute **côté serveur**
- les hooks React côté client sont **interdits** par défaut  
  (`useState`, `useEffect`, `useReducer`, etc.)

---

### Activer explicitement le mode client

Pour autoriser l'interactivité (utilisation des `hooks`), il faut déclarer :

```js
"use client";
```

Cela signifie que :

- le composant devient un **Client Component**, comme dans React.
- le code s'exécute **dans le navigateur**
- `useState`, `useEffect`, les événements (`onClick`, `onChange`, ...) sont autorisés

---

### Cas particulier des pages

Une `page.tsx` **peut** être un composant client, mais :

- elle perd le rendu serveur (SSR)
- les données ne sont plus chargées avant l'affichage
- les performances et le SEO sont impactés

➡️ **Bonne pratique recommandée :**

- `page.tsx` reste **serveur**
- l'état et l'interaction sont délégués à des **composants enfants client**


---

## Exemple

1. Le navigateur demande une page
2. Le serveur :
   - charge les données
   - génère le HTML
3. Le navigateur reçoit une page prête à afficher
   - **Les données sont déjà intégrées au HTML**.

---

## Utiliser `fetch()` dans une page

Une page peut être `async`.

```js
export default async function Page() {
  const response = await fetch("https://example.com/api/data");
  const data = await response.json();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

- `fetch()` s'exécute **côté serveur**
- Le HTML est généré **avec les données**

---

## Différence avec React côté client

### React SPA classique

- la page s'affiche
- `useEffect` déclenche un fetch
- l'UI se met à jour ensuite

### Next.js App Router

- les données sont chargées **avant**
- l'UI est prête immédiatement

**Meilleure performance et meilleure expérience utilisateur.**

---

## Le cache intégré de Next.js

Next.js ajoute un **cache automatique** à `fetch()`.

Par défaut :

- les requêtes peuvent être mises en cache
- les données peuvent être réutilisées entre requêtes

Cela améliore les performances sans effort supplémentaire.

---

## Contrôler le cache (vue d'ensemble)

Sans entrer dans le détail :

- données stables → cache
- données dynamiques → pas de cache
- données à rafraîchir → revalidation

Next.js permet d'adapter le comportement **selon le besoin métier**.

---

## Exemple : données locales (JSON)

```js
import { quizzes } from "@/data/quizzes";

export default function QuizPage() {
  return (
    <ul>
      {quizzes.map((quiz) => (
        <li key={quiz.id}>{quiz.title}</li>
      ))}
    </ul>
  );
}
```

- Même logique que `fetch()`
- Le jour où la source change, l'architecture reste identique

---

## Exemple : données dynamiques par route

```js
export default async function QuizPage({ params }) {
  const { id } = await params;

  const response = await fetch(
    `https://example.com/api/quiz/${id}`
  );
  const quiz = await response.json();

  return <h1>{quiz.title}</h1>;
}
```

➡️ L'URL pilote la donnée
➡️ Le chargement est toujours serveur

---

## Gestion des états de chargement

Next.js fournit des fichiers dédiés :

- `loading.js` → affiché pendant le chargement
- `error.js` → affiché en cas d'erreur

➡️ Pas besoin de gérer ces états dans le composant.

---

## Exemple de structure

```txt
app/
 └── quiz/
     ├── page.js
     ├── loading.js
     └── error.js
```

---

## Et côté client ?

Le chargement côté client est utile uniquement pour :

- interactions utilisateur
- données dépendantes d'actions (clic, formulaire)
- mises à jour fréquentes

➡️ Dans ce cas :

- `"use client"`
- `useState`, `useEffect`
- ou plus tard TanStack Query

---

## Bon réflexe à adopter

> Charger les données **le plus haut possible**, **le plus tôt possible côté serveur quand c'est possible**.

---

## Préparer la base de données

Quand une base de données est ajoutée :

```js
const quizzes = await db.quiz.findMany();
```

➡️ Le reste du code ne change pas
➡️ Même endroit, même logique

---

## Synthèse

- `fetch()` peut être utilisé directement dans les pages
- Les données sont chargées côté serveur
- Le HTML est généré avec les données
- Next.js gère le cache et le chargement
- L'architecture est prête pour la production

Voici une **suite de slides Marp**, **claires et pédagogiques**, pour **introduire l'utilisation de `fetch` avec une API interne** et **préparer le TP**, sans entrer trop tôt dans les détails SQL.

---

# Charger des données avec `fetch`

## et préparer l'arrivée de MySQL

---

## Pourquoi ne pas accéder directement aux données ?

Accéder directement aux données depuis une page :

- fonctionne pour des exemples simples
- devient difficile à maintenir
- complique l'arrivée d'une base de données

➡️ Une application réelle sépare :

- l'interface
- l'API
- l'accès aux données

---

## Architecture cible

```txt
Page (Server Component)
   ↓ fetch
API interne Next.js
   ↓
Accès aux données (JSON / MySQL)
```

➡️ Chaque couche a une responsabilité claire.

---

## Le rôle de `fetch` dans Next.js

`fetch` sert à :

- appeler une API
- récupérer des données
- rester indépendant de la source (JSON, base, service externe)

Même côté serveur, on utilise `fetch` **comme pour une API distante**.

---

## API interne avec Next.js

Next.js permet de créer des routes API dans `app/api`.

Exemple de structure :

```txt
app/
 └── api/
     └── quizzes/
         ├── route.js
         └── [id]/
             └── route.js
```

➡️ Ces routes renvoient du JSON.

---

## Rôle des routes API

Les routes API :

- contiennent la logique d'accès aux données
- appellent un repository
- ne connaissent pas l'interface utilisateur

Elles seront les seules à évoluer lors du passage à MySQL.

---

## Pages : consommer l'API

Les pages :

- appellent l'API avec `fetch`
- ne connaissent pas la base de données
- affichent les données reçues

➡️ Une page ne fait que :

- charger
- afficher
- naviguer

---

## Retour au plan 

[plan](https://antoine07.github.io/nexts-h3)