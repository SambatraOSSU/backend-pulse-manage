# Node JS + Express JS

Ceci est le backend du projet Pulse-manage , notre projet 2ème année à l' ISPM Antsobolo

## Lancer le serveur sur local
- installer les packages:

```js
   npm  install
```

- Configurer la base de données MongoDB avec le cluster mongoDB Atlas ou en local:

```js
    Dans `.env`, se trouve le URI mongoDB Atlas pour le cluster en ligne ou mongoDB Compass en local ,
    Dans `src/database`,changer par process.env.MONGODB_ATLAS_URI pour accéder au cluster en ligne et process.env.MONGODB_COMPASS_URI pour utiliser MongoDB en local,
```


- Structure de l' application: 

```bash
    `src/server` : fichier du serveur, 
    `src/controller` : fichiers contenant les fonctions pour les controllers de l' app, 
    `src/helper` : fichiers contenant les fonctions pour les helpers de l' app,
    `src/database` : configuration de la base de données,
    `src/routes` : configuration des routes de l' application pour les API calls par Express JS,
```

- Lancer le serveur

```js
    npm run server
```
