---
marp: true
theme: default
paginate: true
class: lead
---


# Charger des données depuis MySQL

### Principe général

Avec une base **MySQL** :

- la page **ne parle jamais directement à la base**
- l'accès se fait via une **route API**
- la page continue d'utiliser `fetch`

Le passage JSON → MySQL ne change **pas** l'architecture.

---

## Exemple : table `quizzes`

### Structure minimale

```sql
quizzes
--------
id          INT
title       VARCHAR
description TEXT
created_at  DATETIME
```

Objectif :

- récupérer la liste des quizzes
- exposer les données en JSON
- consommer cette API dans une page Next.js

---

## Route API : lecture depuis MySQL

`app/api/quizzes/route.ts`

```ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const quizzes = await db.query(
    "SELECT id, title FROM quizzes"
  );

  return NextResponse.json(quizzes);
}
```

- le code s'exécute **côté serveur**
- la base est accessible uniquement ici
- la page reste totalement découplée

**MySQL est encapsulé**, l'UI n'en sait rien.

---

## Connexion MySQL avec `mysql2`

### Une seule connexion partagée (pool)

On utilise un **pool de connexions** :

- évite d'ouvrir une connexion à chaque requête
- améliore les performances
- indispensable en production (serverless inclus)

Installation :

```bash
npm install mysql2
```

---

## Centraliser la connexion (`lib/db.js`)

```ts
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
```

- fichier chargé **uniquement côté serveur**
- le pool est réutilisé automatiquement
- aucune logique métier ici

> **Un seul point d'accès à la base**

---

## Variables d'environnement `.env.local`

*Pour la production on renommera ce fichier `.env`*

```env
DB_HOST=localhost
DB_PORT=3037
DB_USER=quiz_user
DB_PASSWORD=quiz_password
DB_NAME=quiz_app
```

- jamais de credentials dans le code
- `.env.local` n'est pas versionné
- Next.js injecte ces variables **côté serveur**


---

## Résumé 

- `mysql2` → driver MySQL moderne
- `createPool` → connexion optimisée
- `lib/db.ts` → responsabilité unique
- `.env.local` → configuration sécurisée

L'API est prête pour évoluer (transactions, ORM, Prisma).

---

## Installation MySQL

---

## Installer et vérifier MySQL (Windows)

Télécharger **l'installateur Web** :
**Windows (x86, 32-bit), MSI Installer — Web**
`mysql-installer-web-community-8.0.44.0.msi`

Pendant l'installation :

- Type : **Developer Default**
- Installer :
    - **MySQL Server**
    - (optionnel) MySQL Workbench
- Port : **3306**
- Mot de passe **root** : choisissez-en un et notez-le

---

### Vérification (obligatoire)

Dans **MySQL Workbench** ou le terminal :

```bash
mysql -u root -p
```

Puis :

```sql
SELECT VERSION();
```

Si une version s'affiche, MySQL fonctionne.

---

### Configuration 

Créer ou modifier le fichier suivant `.env.local` :

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=VOTRE_MOT_DE_PASSE_ROOT
DB_NAME=quiz_app
```

Points importants :

- on utilise **root uniquement pour le cours**
- le port est **3306** sur Windows
- le fichier `.env.local` n'est jamais partagé

----

### Après modification

```bash
npm run dev
```

**Redémarrage obligatoire** pour prendre en compte la configuration

---

## TP

[TP MySQL](https://github.com/Antoine07/nexts-h3/TPs/04_bd.md)