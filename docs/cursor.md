# Travailler avec Cursor

Ouvrir le dossier du dépôt comme projet, puis installer les extensions **Astro** et **Prettier** proposées dans `.vscode/extensions.json`.

Le fichier `AGENTS.md` à la racine donne le contexte et les conventions. La règle `.cursor/rules/blog.mdc` rappelle de le consulter. Il n’est pas nécessaire de recopier tout ce contexte dans chaque demande.

## Première ouverture

Dans le terminal du projet :

```sh
nvm use
npm ci
npm run dev
```

Garder le serveur ouvert pendant les modifications et consulter l’adresse qu’il affiche. Avec une installation manuelle de Node 24, `nvm use` peut être omis.

## Demandes prêtes à adapter

### Créer un brouillon

> Lis AGENTS.md et docs/editorial.md. Crée un brouillon sur [sujet], dans la catégorie [catégorie]. Voici mes notes : [notes]. Respecte mon point de vue et ne complète pas les éléments manquants par des anecdotes ou des chiffres inventés. Utilise le script new:post, garde draft: true et termine par npm run validate.

Fournir des notes, exemples et opinions est plus utile que demander un texte qui « sonne personnel » sans matière de départ.

### Retravailler un article existant

> Relis [chemin du fichier]. Conserve les idées, faits et opinions présents. Rends les phrases plus naturelles, coupe les répétitions et vérifie les liens des sources. Propose un titre et une description précis. Garde son URL et son statut de publication. Lance npm run validate après modification.

### Faire évoluer le thème

> Lis AGENTS.md, puis ajuste [élément précis]. Réutilise les couleurs et composants du thème paon. Vérifie le rendu sur mobile et ordinateur ainsi que la navigation au clavier. Ne change pas les articles. Lance npm run validate et décris le résultat.

### Préparer un article validé pour publication

> Le texte de [chemin du fichier] est validé pour publication. Vérifie son titre, sa description, ses sources, les images et sa date, puis passe draft à false. Lance npm run validate et prépare la modification dans une branche et une pull request. Indique séparément si le site a été déployé ou si la pull request reste à fusionner.

### Préparer le lancement

> Vérifie le dépôt avec docs/deploiement.md. Lance les contrôles, examine la configuration GitHub Pages et dresse la liste des actions restantes pour raccorder taous.deneuve.xyz. Étienne fera le DNS. Ne présente pas le domaine comme en ligne avant de l’avoir vérifié.

## Avant de livrer une modification

1. Consulter le diff pour vérifier les changements réels.
2. Exécuter `npm run validate` et corriger les erreurs.
3. Pour le design, regarder le résultat sur mobile et ordinateur.
4. Vérifier le build avec `npm run preview` lorsqu’il faut examiner ce qui sera public. Ce mode exclut les brouillons.
5. Préparer une pull request qui décrit le changement et les contrôles réalisés.

Pour une modification de publication, examiner aussi les pages, listes, RSS et sitemap : un brouillon ne doit pas y apparaître. Le build statique constitue le résultat livré, pas la page de développement.

## Références

- [Règles de projet et AGENTS.md dans Cursor](https://cursor.com/docs/rules)
- [Documentation Astro](https://docs.astro.build/)
