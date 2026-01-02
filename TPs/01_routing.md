## 01 TP — Afficher des quiz à partir de données JSON locales

### Objectif du TP

Créer une page `/quiz` qui :

* affiche une liste de quiz,
* utilise des données stockées dans un tableau JSON,
* permet d'accéder à un quiz via une route dynamique.

---

## Créer les données de quiz (JSON local)

Créer le fichier suivant :

```
src/data/quizzes.js
```

### Contenu du fichier

```js
export const quizzes = [
  {
    id: "1",
    title: "Quiz JavaScript",
    description: "Bases du langage JavaScript",
  },
  {
    id: "2",
    title: "Quiz React",
    description: "Fondamentaux de React",
  },
  {
    id: "3",
    title: "Quiz Next.js",
    description: "Introduction à Next.js",
  },
];
```

---

##  Afficher la liste des quiz

Créer (ou compléter) le fichier :

```
src/app/quiz/page.js
```

### Code attendu

```js
import Link from "next/link";
import { quizzes } from "@/data/quizzes";

export default function QuizListPage() {
  return (
    <section>
        {/* affichez les quiz*/}
    </section>
  );
}
```

---

## Créer la page dynamique d'un quiz

Créer le fichier :

```
src/app/quiz/[id]/page.js
```

### Code attendu

```js
import { quizzes } from "@/data/quizzes";

export default function QuizDetailPage({ params }) {


  return (
    <section>
       {/* affichez le détail d'un quiz*/}
    </section>
  );
}
```

## Créez un layout spécifique

Vous allez maintenant créez un layout spécifique pour les quiz, pensez à mettre le tag `children` dans ce dernier.