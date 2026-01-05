# API Next

1. Créez une page qui utilise fetch pour récupérer une liste de titre d'article que vous affichez dans la page dont l'url est `post`

Data pour l'api

```js
const posts = [{ title: "MySQL" }, { title: "Next" }, { title: "React" }];
```

Remarque

Pour définir une route d'api de type GET utiliser le code suivant

```js
export async function GET(request) {
  return Response.json({
    content: "Hello les posts",
  });
}
```

## Créez deux routes d'API

- `user` pour récupérez tous les utilisateurs
- `user/[userId]`

Créez une page qui affiche tous les utilisateurs et un utilisateur

data

```js
const users = [
  { id: 1, name: "Mathis" },
  { id: 2, name: "Emilio" },
  { id: 3, name: "Olivia" },
  { id: 4, name: "Thibault" },
  { id: 5, name: "Alexandre" },
];
```
