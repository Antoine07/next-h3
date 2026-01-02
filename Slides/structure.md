---
marp: true
theme: default
paginate: true
class: lead
---

## Organiser le rendu avec des composants UI

---

## Pourquoi organiser le rendu ?

Quand une application grandit :

- les pages deviennent longues
- le JSX est difficile à lire
- le rendu est difficile à réutiliser

➡️ Il faut **séparer la structure de page du rendu UI**.

---

## Principe général

Dans une application Next.js :

- **Les pages** orchestrent (routing, données)
- **Les composants UI** affichent (HTML, CSS)
- Chaque composant a un rôle clair

➡️ On gagne en lisibilité et en réutilisabilité.

---

## Dossier `ui/`

On crée un dossier dédié aux composants visuels.

Exemple :

```txt
src/
 ├── app/
 ├── data/
 └── ui/
     └── QuizCard.js
```

➡️ Le dossier `ui/` contient uniquement du rendu.

---

## Exemple : composant UI simple

### `src/ui/QuizCard.js`

```js
export default function QuizCard({ title, description, href }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={href}>Commencer le quiz</a>
    </article>
  );
}
```

À retenir :

- pas de logique métier
- pas de fetch
- pas de state
- uniquement du HTML / CSS

---

## Utilisation dans une page

### `src/app/quiz/page.js`

```js
import { quizzes } from "@/data/quizzes";
import QuizCard from "@/ui/QuizCard";

export default function QuizListPage() {
  return (
    <section>
      <h1>Liste des quiz</h1>

      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          title={quiz.title}
          description={quiz.description}
          href={`/quiz/${quiz.id}`}
        />
      ))}
    </section>
  );
}
```

➡️ La page reste lisible
➡️ Le rendu est délégué au composant UI

---

## Organisation finale

```txt
src/
 ├── app/
 │   └── quiz/
 │       └── page.js
 ├── data/
 │   └── quizzes.js
 └── ui/
     └── QuizCard.js
```

---

## Bonnes pratiques à retenir

* Un composant UI = un rôle visuel
* Les pages restent courtes
* Le rendu est réutilisable
* La structure est claire

---

## Exercice — Organisation UI

### Objectif

Extraire le rendu HTML de la page `/quiz` dans un composant UI réutilisable.

---

### À réaliser

1. Créer le dossier `src/ui`
2. Créer le composant `QuizCard`
3. Déplacer le rendu HTML de `/quiz` vers `QuizCard`
4. Utiliser `QuizCard` dans la page `/quiz`

---

## La notion de composants - dans Next ou React

---

## Qu'est-ce qu'un composant ?

Un **composant** est une fonction React qui :

- reçoit des données (props)
- retourne du JSX
- peut être réutilisée à plusieurs endroits

➡️ Un composant sert à **découper l'interface**.

---

## Pourquoi utiliser des composants ?

Sans composants :

- les pages deviennent longues
- le code est dupliqué
- la maintenance est difficile

Avec des composants :

- le code est plus lisible
- chaque partie a un rôle clair
- on réutilise facilement le rendu

---

## Pages vs Components

Dans une application Next.js :

- **Les pages (`page.js`)**

  - définissent une route
  - orchestrent les données et le rendu

- **Les composants**

  - ne définissent pas de route
  - servent uniquement à construire l'interface

➡️ Une page est composée de composants.

---

## Exemple simple de composant

```js
export default function Title({ text }) {
  return <h1>{text}</h1>;
}
```

Ce composant :

- reçoit une prop `text`
- affiche un titre
- peut être utilisé partout

---

## Utilisation dans une page

```js
import Title from "@/components/Title";

export default function HomePage() {
  return (
    <section>
      <Title text="Accueil" />
      <p>Bienvenue sur l'application.</p>
    </section>
  );
}
```

➡️ La page assemble plusieurs composants.

---

## Organisation des composants

On organise les composants par rôle.

Exemple :

```txt
src/
 ├── app/          → pages et routing
 ├── ui/           → composants purement visuels
 └── components/   → composants génériques
```

---

## Différence entre `components/` et `ui/`

- **`ui/`**

  - rendu HTML / CSS
  - aucun lien avec le métier
  - très réutilisable

- **`components/`**

  - composants génériques
  - structure de page
  - assemblage de UI components

➡️ Les deux sont complémentaires.

---

## Exemple de composant générique

### `src/components/Section.js`

```js
export default function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

---

## Composition de composants

```js
import Section from "@/components/Section";
import QuizCard from "@/ui/QuizCard";

export default function QuizPage() {
  return (
    <Section title="Liste des quiz">
      <QuizCard title="Quiz JS" />
    </Section>
  );
}
```

➡️ Un composant peut contenir d'autres composants.

---

## TP quiz 

[Navigation et composants : afficher le détail d'un quiz](https://github.com/Antoine07/nexts-h3/blob/main/TPs/02_btn_components)


---

## Retour au plan 

[plan](https://antoine07.github.io/nexts-h3)