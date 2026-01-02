---
marp: true
theme: default
paginate: true
class: lead
---

## Structure d'une application Next.js (App Router)

---

## Le dossier `app/` : racine du routing

Le dossier `app/` est le **point de départ du routing** dans Next.js.

Principes fondamentaux :

- **La structure des dossiers définit les URLs**
- **Aucune configuration de routes n'est nécessaire**

➡️ On lit directement les routes dans l'arborescence.

---

## Pages : `page.js`

Un fichier `page.js` :

- représente **une page accessible par URL**
- exporte un composant React par défaut

Exemple :

```txt
app/page.js
```

URL correspondante :

```
/
```

---

## Exemple avec un sous-dossier

```txt
app/quiz/page.js
```

Crée automatiquement la route :

```
/quiz
```

À retenir :

- un dossier = un segment d'URL
- `page.js` est nécessaire pour afficher une page

---

## Layouts : `layout.js`

Un fichier `layout.js` :

- définit une **structure commune**
- s'applique à toutes les pages du dossier concerné

Il est utilisé pour :

- la structure HTML
- le header / footer
- les styles globaux

---

## Le rôle de `children`

`children` représente **le contenu de la page affichée**.

Le layout racine définit obligatoirement :

- `<html>`
- `<body>`

---

```js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
```

➡️ La page courante est injectée automatiquement à l'emplacement de `children`.

---

## Layouts imbriqués (par route)

Chaque dossier peut avoir son propre layout.

Exemple :

```txt
app/blog/layout.js
```

Ce layout s'applique uniquement aux pages :

```
/blog
```

```js
export default function BlogLayout({ children }) {
  return <section>{children}</section>
}
```

➡️ Les layouts sont **imbriqués automatiquement**.

---

## Routes dynamiques

Les dossiers entre crochets créent des routes variables.

Exemple :

```txt
app/quiz/[id]/page.js
```

URLs possibles :

```
/quiz/1
/quiz/2
/quiz/42
```

➡️ `[id]` représente une variable dans l'URL
➡️ Sa valeur est accessible dans la page

---

## Routes dynamiques et asynchronisme

Dans le **App Router**, les pages sont des **Server Components**.

➡️ Certaines données (comme `params`)
➡️ sont fournies **de manière asynchrone**
➡️ sous forme de **Promise**

---

## Ce qui ne fonctionne pas

```js
export default function Page({ params }) {
  console.log(params.id) // ❌ erreur
}
```

`params` n'est pas encore résolu.

---

## Bonne pratique

```js
export default async function Page({ params }) {
  const { id } = await params
}
```

➡️ Une page dynamique peut (et doit) être `async`.

---

## Exemple complet de structure

```txt
app/
 ├── layout.js
 ├── page.js
 └── quiz/
     ├── page.js
     └── [id]/
         └── page.js
```

Correspondance :

- `/` → page d'accueil
- `/quiz` → liste des quiz
- `/quiz/1` → quiz spécifique

---

## Synthèse rapide

- **Le routing est basé sur les fichiers**
- **`page.js` crée une page**
- **`layout.js` définit une structure partagée**
- **`children` est l'emplacement du contenu**
- **`[param]` crée une route dynamique**
- **`params` est asynchrone dans les pages dynamiques**

---

## 01 TP - Affichez les quiz 

Récupérez le TP dans le dossier `TPs` de notre dépôt : [01 TP affichez les quiz](https://github.com/Antoine07/nexts-h3/blob/main/TPs/01_routing.md)

---

## Retour au plan 

[plan](https://antoine07.github.io/nexts-h3)