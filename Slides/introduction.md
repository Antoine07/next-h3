---
marp: true
theme: default
paginate: true
class: lead
---

## Next.js : contexte et origine

Next.js est un framework JavaScript créé par **Vercel** en **2016**.

À l'origine, React permettait surtout de créer :
- des applications côté navigateur (SPA)
- avec peu de solutions intégrées pour le SEO, le routing ou la performance

---

## Vercel

> **Vercel** est une plateforme de déploiement pour applications web modernes.
Elle supporte plusieurs frameworks front-end (React, Vue, Svelte, etc.) et est optimisée en particulier pour Next.js.

---

Next.js a été conçu pour :
- faciliter le rendu côté serveur
- structurer les applications React
- répondre aux besoins des applications web modernes

---

### Pourquoi Next.js aujourd'hui ?

Next.js apporte nativement :
- le routing par fichiers
- le rendu serveur et hybride (SSR, SSG)
- l'optimisation automatique (performance, SEO)
- une architecture adaptée à la production

Aujourd'hui, Next.js est largement utilisé pour :
- des sites web professionnels
- des plateformes SaaS
- des applications à fort trafic


---

### Le rendu serveur et hybride (SSR, SSG)

Les pages peuvent être générées :
- côté serveur
- ou à l'avance

➡️ Les pages s'affichent plus vite  
➡️ Le contenu est accessible immédiatement

---

## SSR et SSG : de quoi parle-t-on ?

Quand on affiche une page web, une question se pose :

> **Quand et où la page est-elle générée ?**

---

## SSR — Server-Side Rendering

**SSR** signifie *rendu côté serveur*.

Principe :

- la page est générée **au moment de la demande**
- le serveur crée le HTML
- le navigateur reçoit une page déjà prête à afficher

---

Avantages :

- contenu visible immédiatement
- bon pour le SEO
- données toujours à jour

À retenir :

> La page est construite **à la demande**, côté serveur.

---

## SSG — Static Site Generation

**SSG** signifie *génération statique*.

Principe :

- la page est générée **à l'avance**
- lors du build ou du déploiement
- le HTML est stocké et réutilisé

---

Avantages :

- pages très rapides
- peu de charge serveur
- idéal pour du contenu qui change peu

À retenir :

> La page est prête **avant même que l'utilisateur arrive**.

---

## Synthèse

- **SSR** : la page est générée *quand l'utilisateur arrive*
- **SSG** : la page est générée *avant que l'utilisateur arrive*

---

## Pourquoi Next.js est intéressant

Next.js permet de :

1. choisir le bon mode selon la page
1. mélanger SSR, SSG et client
1. sans changer d'outil

➡️ Plus de flexibilité, sans complexité excessive.

---

## A savoir

> Avec Next.js, le code JavaScript peut s'exécuter soit côté serveur, soit côté navigateur.
> **Par défaut, les composants sont exécutés sur le serveur et génèrent du HTML et du CSS**, ce qui permet un affichage rapide et un JavaScript minimal côté client.
> **Lorsqu'un composant doit être interactif**, on utilise "use client" pour indiquer que son code doit être envoyé au navigateur, compilé et exécuté côté client.
Next.js permet ainsi de combiner rendu serveur et interactivité, en envoyant uniquement le JavaScript nécessaire.


---

## Retour au plan 

[plan](https://antoine07.github.io/nexts-h3)