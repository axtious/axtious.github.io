# Le carnet de Taous — instructions pour les agents

Ce fichier s’applique à tout le dépôt. Lis-le avant de modifier le site, puis consulte les fichiers concernés. Les demandes explicites de Taous priment sur les conventions de ce document. Ne transforme pas une préférence de style en demande d’approbation systématique.

## Le projet

Blog personnel de **Taous Deneuve**, destiné à `https://taous.deneuve.xyz`. Il accueille ses réflexions sur l’entrepreneuriat et ses projets : **My Dare**, **Omnivya**, **Sanad** et **ScaLion**. C’est un carnet signé, avec un point de vue personnel ; les entreprises sont des sujets, pas des pages commerciales à remplir.

Le site est statique et hébergé sur GitHub Pages. Étienne s’occupe du DNS au moment du lancement. Les paramètres du domaine et les étapes de lancement sont décrits dans `docs/deploiement.md`.

## Commencer sans deviner

1. Lis `package.json`, `.nvmrc`, `astro.config.mjs` et `src/content.config.ts` avant une modification technique.
2. Vérifie `git status` et préserve les changements déjà présents. Ne réinitialise pas le travail d’un autre contributeur.
3. Utilise **Node 24**, **npm** et le `package-lock.json` du dépôt : `nvm use`, puis `npm ci`.
4. Lance `npm run dev` pour travailler. `npm run preview` sert à examiner le résultat de production après un build.
5. Termine par `npm run validate`. Décris précisément ce qui a changé, ce qui a été vérifié et tout contrôle impossible à effectuer.

N’ajoute pas de gestionnaire de paquets concurrent ni de second lockfile. Lorsqu’une dépendance change, mets à jour `package.json` et `package-lock.json` ensemble. Respecte la version installée ; ne copie pas une API Astro ancienne depuis un exemple.

## Architecture et responsabilités

| Emplacement             | Rôle                                                       |
| ----------------------- | ---------------------------------------------------------- |
| `src/config/site.ts`    | Identité, métadonnées et configuration éditoriale partagée |
| `src/content.config.ts` | Collection Astro et validation du frontmatter              |
| `src/content/blog/*.md` | Articles et brouillons                                     |
| `src/pages/`            | Routes, RSS et autres sorties publiques                    |
| `src/layouts/`          | Structure des pages et des articles                        |
| `src/components/`       | Éléments de présentation réutilisables                     |
| `src/styles/`           | Styles et couleurs du thème                                |
| `public/images/`        | Images référencées par un chemin `/images/...`             |
| `templates/article.md`  | Modèle utilisé pour créer un article                       |
| `docs/`                 | Guide éditorial, utilisation de Cursor et déploiement      |
| `.github/workflows/`    | Vérification et déploiement GitHub Actions                 |

Privilégie Astro, TypeScript strict, HTML sémantique et CSS natif. Le blog n’a besoin ni d’une application React, ni d’un serveur, ni d’une base de données. Ajoute du JavaScript côté navigateur seulement pour un besoin concret. N’introduis pas une bibliothèque ou un service pour reproduire une fonction déjà disponible.

Pour les collections Astro actuelles : utilise `src/content.config.ts`, `defineCollection` depuis `astro:content`, `glob` depuis `astro/loaders` et `z` depuis `astro/zod`. Lis l’implémentation existante avant de modifier les imports ou le chargement des articles.

## Articles et publication

- Crée un article avec `npm run new:post -- mon-sujet`. Le fichier est un brouillon par défaut.
- Le nom du fichier est l’identifiant de l’URL : `mon-sujet.md` devient `/blog/mon-sujet/`. Utilise des minuscules ASCII et des tirets ; pas de champ `slug` supplémentaire.
- Garde `draft: true` pour un texte à relire. Une demande explicite de publication vaut validation ; sinon, n’affirme pas qu’un article est approuvé.
- Respecte le schéma dans `src/content.config.ts`. La description est une phrase utile de 160 caractères maximum. Les dates sont des chaînes ISO entre guillemets, au format `YYYY-MM-DD`.
- Catégories disponibles : `entreprendre`, `my-dare`, `omnivya`, `sanad`, `scalion`. Ne crée pas une variante orthographique pour une même catégorie.
- Une image `cover` est un chemin local `/images/...` et nécessite `coverAlt`. Vérifie que le fichier existe et que les droits d’utilisation conviennent.
- Un titre principal est produit par la page : commence le corps Markdown avec des `##`, puis des `###` si nécessaire.
- Réutilise la sélection d’articles partagée du projet. Les brouillons et articles datés dans le futur doivent rester absents de **toutes** les sorties de production : pages d’articles, listes, flux RSS et sitemap. Leur visibilité en développement ne doit pas modifier cette règle.
- Un site statique ne publie pas tout seul à minuit : un article daté dans le futur nécessite un nouveau build une fois sa date atteinte.
- Préserve les URLs déjà publiées. Si un changement est nécessaire, propose une stratégie de redirection compatible avec GitHub Pages.

Voir `docs/editorial.md` pour un exemple complet et les conventions de rédaction.

## La voix de Taous

Écris en français naturel, avec des phrases claires, des observations concrètes et un point de vue. Évite les introductions interchangeables, les superlatifs, les formules de publicité et les conclusions qui répètent tout l’article. Une page ne doit pas donner l’impression d’un communiqué d’entreprise.

Ne prête pas à Taous des anecdotes, opinions ou citations qu’elle n’a pas fournies. N’invente ni clients, chiffres, résultats, témoignages ou références d’études. Ne transforme pas des informations privées de conversation en contenu public. Demande seulement la précision qui manque réellement, ou laisse un repère explicite dans un brouillon.

Pour une affirmation documentée, vérifie une source pertinente et ajoute le lien dans le texte. Préfère l’étude, l’organisme ou la documentation d’origine. Une référence ne doit pas servir d’ornement. Vérifie l’actualité des informations qui peuvent changer.

Orthographes : **Taous Deneuve**, **My Dare**, **Omnivya**, **Sanad**, **ScaLion**. Ne fabrique pas les adresses des projets ou des réseaux sociaux ; utilise celles qui ont été confirmées.

## Direction visuelle

L’inspiration est le paon : **bleu paon, vert profond, ivoire et or mat en accent**. Recherche une atmosphère éditoriale, chaleureuse et lisible. Les motifs de plume restent discrets et décoratifs ; ils ne doivent pas gêner la lecture.

Réutilise les variables CSS, les composants et les typographies du thème. Privilégie l’espace, une hiérarchie nette et une largeur de texte confortable. Vérifie le résultat sur petit écran comme sur ordinateur, le contraste, le focus clavier et la préférence de mouvement réduit. Donne aux liens un intitulé utile et aux images informatives un texte alternatif.

N’ajoute pas de faux bouton, de formulaire sans traitement ou de lien fictif. Une fonctionnalité proposée dans l’interface doit fonctionner.

## SEO, domaine et exploitation

- Garde `https://taous.deneuve.xyz` comme URL de production. Ce site utilisateur est servi à la racine : aucun préfixe `/axtious.github.io/`.
- Conserve les métadonnées, URL canonique, partage social, RSS et sitemap cohérents avec les contenus réellement publiés.
- Utilise les runners hébergés GitHub. N’introduis pas de runner privé ou de secret pour construire un blog statique.
- Ne confonds pas un build vert, un déploiement réussi et un domaine accessible : ce sont trois vérifications distinctes.
- Ne modifie pas le DNS ni les réglages de publication sans demande correspondante. Le dépôt contient la préparation et les instructions de lancement.

## Vérifications attendues

La CI ajoute les contrôles navigateur de `tests/browser/` via `npm run test:browser` et conserve les captures dans l’artefact `apercus-blog`. En local, installer Chromium avec `npx playwright install chromium` et construire le site avant de les lancer. Si le navigateur est indisponible dans l’environnement, utiliser les résultats de la CI et le signaler ; ne pas désactiver une vérification pour masquer ce blocage.

`npm run validate` regroupe formatage, vérification Astro/TypeScript, build statique et contrôle des fichiers produits. Pour un changement visuel, examine aussi la page rendue à une largeur mobile et sur ordinateur. Pour un changement de publication, vérifie explicitement l’absence des brouillons et contenus futurs dans les sorties concernées.

Garde les modifications proportionnées à la demande. Ne masque pas une erreur avec `any`, une désactivation de contrôle ou la suppression d’une vérification utile. En fin de tâche, indique les fichiers principaux, les vérifications effectuées et les éventuelles étapes de lancement restantes.
