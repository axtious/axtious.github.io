# Le carnet de Taous

Le blog personnel de **Taous Deneuve** : entreprendre, construire des projets et partager ce que le terrain apprend. My Dare, Omnivya, Sanad et ScaLion y ont leur place, dans un univers inspiré des couleurs du paon.

**Adresse prévue :** [taous.deneuve.xyz](https://taous.deneuve.xyz). Le domaine sera raccordé par Étienne au lancement ; sa présence dans la configuration ne signifie pas qu’il est déjà accessible.

## Démarrer dans Cursor

Ouvrir le dossier du dépôt dans Cursor, avec Node 24 installé :

```sh
nvm use
npm ci
npm run dev
```

Si `nvm` n’est pas installé, utiliser directement une version Node 24 compatible avec `package.json`. Ouvrir ensuite l’adresse locale affichée par Astro, généralement `http://localhost:4321`.

Cursor dispose d’un [AGENTS.md](./AGENTS.md) à la racine et d’une courte règle de projet dans `.cursor/rules/blog.mdc`. Les consignes détaillent la structure du blog, le style, la rédaction et les vérifications à effectuer.

## Écrire un article

```sh
npm run new:post -- mon-premier-article
```

Le script crée un fichier dans `src/content/blog/`, à partir de `templates/article.md`, avec `draft: true`. Le nom du fichier devient son URL, par exemple `/blog/mon-premier-article/`.

Modifier le titre, la description, la date, la catégorie et le texte. Les brouillons sont visibles avec `npm run dev`, accompagnés d’un repère. Ils sont exclus du site de production, comme les articles dont la date est future.

Lorsqu’un article est validé, passer `draft` à `false`, vérifier sa date et lancer les contrôles avant de proposer la modification. Un contenu futur ne sera rendu public qu’après un nouveau build exécuté à compter de sa date.

Le fichier `bienvenue-dans-mon-carnet.md` est un **brouillon de démonstration**, à personnaliser avant publication. Aucun récit personnel n’y est présenté comme un article approuvé.

## Commandes utiles

La CI vérifie aussi le rendu dans Chromium (ordinateur, mobiles 390 et 320 px, clavier et accès aux brouillons). Les captures sont disponibles dans l’artefact `apercus-blog` du workflow. Pour lancer ces contrôles sur sa machine, exécuter `npx playwright install chromium`, `npm run build`, puis `npm run test:browser`. Ils ne sont pas nécessaires pour démarrer le blog dans Cursor.

| Commande                        | Résultat                                             |
| ------------------------------- | ---------------------------------------------------- |
| `npm ci`                        | Installe les versions du lockfile                    |
| `npm run dev`                   | Démarre le site local, avec les brouillons           |
| `npm run new:post -- mon-sujet` | Crée un nouveau brouillon                            |
| `npm run check`                 | Vérifie Astro et TypeScript                          |
| `npm run build`                 | Génère le site de production dans `dist/`            |
| `npm run preview`               | Sert le dernier build, sans les brouillons           |
| `npm run test:build`            | Contrôle les sorties du build                        |
| `npm run format`                | Formate les fichiers du projet                       |
| `npm run format:check`          | Vérifie leur formatage                               |
| `npm run validate`              | Exécute l’ensemble des vérifications avant livraison |

## Les fichiers à connaître

| Besoin                                         | Fichier ou dossier                               |
| ---------------------------------------------- | ------------------------------------------------ |
| Changer l’identité ou les métadonnées communes | `src/config/site.ts`                             |
| Modifier les champs des articles               | `src/content.config.ts`                          |
| Rédiger                                        | `src/content/blog/`                              |
| Ajouter des images                             | `public/images/`                                 |
| Ajuster le thème                               | `src/styles/`, `src/components/`, `src/layouts/` |
| Modifier une page                              | `src/pages/`                                     |
| Guider Cursor                                  | `AGENTS.md`                                      |
| Préparer la mise en ligne                      | `docs/deploiement.md`                            |

## Technologie et publication

Astro produit un site statique, avec TypeScript strict et du CSS natif. Les dépendances et leur version exacte sont enregistrées dans `package.json` et `package-lock.json`. Le gestionnaire de paquets du projet est npm.

Les workflows GitHub Actions vérifient le projet sur des runners GitHub standards et préparent le déploiement sur GitHub Pages. La configuration utilise l’URL finale et aucun préfixe de sous-dossier.

**Avant le lancement**, configurer GitHub Pages, son domaine personnalisé, puis le DNS et HTTPS avec Étienne. Avec un déploiement Actions, le fichier `public/CNAME` ne suffit pas à rattacher le domaine : le réglage doit être effectué dans **Settings → Pages**.

## Guides

- [Travailler avec Cursor](./docs/cursor.md) : demandes prêtes à adapter et routine de travail.
- [Rédiger et publier un article](./docs/editorial.md) : champs, brouillons, dates et sources.
- [Mettre le site en ligne](./docs/deploiement.md) : GitHub Pages, domaine, DNS et vérifications.
- [Instructions des agents](./AGENTS.md) : conventions communes à toutes les interventions.
