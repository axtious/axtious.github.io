# Rédiger et publier un article

Le carnet porte la voix de Taous. Les projets donnent matière à raconter, expliquer ou questionner. Un article peut parler de My Dare, Omnivya ou Sanad sans devenir une page de vente.

## Créer un fichier

```sh
npm run new:post -- le-sujet-de-mon-article
```

Le nom du fichier définit son URL : `le-sujet-de-mon-article.md` donnera `/blog/le-sujet-de-mon-article/`. Choisir un nom court et durable, en minuscules sans accents, avec des tirets entre les mots.

Le script part de `templates/article.md` et remplace `{{TITLE}}` et `{{DATE}}`. Les autres éléments restent à personnaliser.

## Les champs d’un article

```yaml
---
title: "Le titre de l’article"
description: "Une phrase qui explique ce que le lecteur trouvera dans cet article."
pubDate: "2026-11-15"
category: "entreprendre"
tags: ["organisation"]
draft: true
---
```

| Champ         | Usage                                                                             |
| ------------- | --------------------------------------------------------------------------------- |
| `title`       | Titre affiché sur la page et dans les listes, de 120 caractères maximum           |
| `description` | Résumé précis, de 160 caractères maximum                                          |
| `pubDate`     | Date de publication prévue, au format `YYYY-MM-DD`                                |
| `updatedDate` | Facultatif ; date d’une révision substantielle, égale ou postérieure à `pubDate`  |
| `category`    | Un des identifiants ci-dessous                                                    |
| `tags`        | Jusqu’à six mots-clés ; tableau vide accepté                                      |
| `draft`       | `true` tant que le texte n’est pas validé pour publication                        |
| `cover`       | Facultatif ; chemin vers une image locale, par exemple `/images/mon-article.webp` |
| `coverAlt`    | Description de l’image, obligatoire lorsqu’une couverture est renseignée          |

Les dates doivent rester entre guillemets. `src/content.config.ts` fait autorité pour les contraintes exactes.

| Identifiant de catégorie | Sujet                                 |
| ------------------------ | ------------------------------------- |
| `entreprendre`           | Réflexions et pratiques transversales |
| `my-dare`                | Le projet My Dare                     |
| `omnivya`                | Le projet Omnivya                     |
| `sanad`                  | Le projet Sanad                       |

## Écrire le corps du texte

Commencer directement par une idée, une situation ou une question précise. Le titre principal est déjà affiché par la page : utiliser des `##` pour les sections et des `###` pour leurs sous-sections.

Une expérience personnelle doit venir des notes de Taous. Un détail manquant peut être laissé sous la forme `[À préciser avec Taous : ...]` dans un brouillon ; il ne doit pas être inventé. Retirer tous ces repères avant publication.

Relier chaque chiffre, étude ou affirmation documentée à une source qui l’étaye. Citer l’étude ou l’organisme d’origine quand c’est possible, préciser la date utile et ne pas confondre un constat avec une interprétation. Une courte section « Sources » peut compléter les liens placés dans le texte.

Pour les images, privilégier un fichier local dont l’usage est autorisé. Optimiser le poids, garder des dimensions adaptées et écrire un texte alternatif qui explique ce que l’image apporte. Ne pas publier des documents clients, informations privées ou captures non anonymisées.

## Comprendre les brouillons et les dates

En développement, `npm run dev` permet de relire les brouillons et les textes prévus pour plus tard. Le build de production exclut les fichiers avec `draft: true` ainsi que les articles datés dans le futur. Le jour courant est calculé dans le fuseau `Africa/Algiers`, défini dans `src/config/site.ts`. Cette exclusion concerne leurs pages, les listes, le RSS et le sitemap.

L’absence de `draft` est traitée comme un brouillon par le schéma du projet. Renseigner le champ explicitement rend néanmoins l’intention plus claire.

Le site étant statique, **une date future ne programme pas un déploiement**. Un nouveau build est nécessaire lorsque la date arrive.

## Publier un texte validé

1. Relire le texte, les sources et les informations publiques qu’il contient.
2. Vérifier titre, description, catégorie, date, image et liens.
3. Passer `draft` à `false` une fois la publication validée par Taous.
4. Exécuter `npm run validate`, puis examiner le résultat avec `npm run preview`.
5. Proposer le changement dans une pull request. Après fusion et déploiement, vérifier l’article sur le site public.

Conserver le nom d’un fichier déjà publié pour préserver son URL. Une correction de titre ne nécessite pas de renommer le fichier. Ajouter `updatedDate` lorsqu’une révision substantielle le justifie.
