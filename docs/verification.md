# État de la préparation — 15 novembre 2026

## Dépôt de départ

`axtious/axtious.github.io`, branche `main`, commit `ead8ed8882530c4fd75af5c6a0c9fc97d78c03fc`. Le dépôt ne contenait qu’un `README.md` vide.

Le socle a été préparé dans une copie locale, sur la branche `setup/astro-blog`. **Il n’a pas pu être envoyé sur GitHub** : la création de branche via le connecteur a renvoyé `403 Resource not accessible by integration`. Aucun commit distant, aucune pull request et aucun déploiement n’ont été créés pendant cette préparation.

## Vérifications réalisées

- Installation des dépendances depuis le registre public npm, avec versions exactes et lockfile.
- `npm run validate` réussi : formatage, vérification Astro/TypeScript (0 erreur, 0 avertissement), build et contrôle des sorties.
- Build final : 10 pages HTML, aucun article publié, un brouillon de démonstration exclu.
- Contrôles des liens et ressources locaux, URLs canoniques, JSON-LD, RSS, sitemap, robots.txt et fichiers GitHub Pages réussis.
- Essai avec des articles temporaires : l’article publié a été généré avec son contenu et son sommaire ; le brouillon et l’article futur ont été exclus des sorties publiques. Les fichiers d’essai ont été supprimés et le site reconstruit.
- Création d’article testée : remplacement des champs du modèle, statut brouillon, refus d’écraser un fichier existant et refus des chemins invalides.
- Revue indépendante de la configuration, du filtrage de publication, de la documentation et du workflow.

## Vérifications encore nécessaires

Le navigateur de l’environnement de préparation ne pouvait pas démarrer et l’écriture GitHub était indisponible. Les tests Playwright sont donc **préparés mais pas encore exécutés**. La CI les lancera sur un runner GitHub standard, avec les captures ordinateur, mobile et article dans l’artefact `apercus-blog`.

Après envoi du code : vérifier la CI, examiner ces captures et corriger tout défaut éventuel avant de lancer le site. Ne pas présenter cette préparation comme un déploiement vérifié.

Le raccordement du domaine, la configuration Pages et HTTPS restent les étapes de lancement décrites dans [deploiement.md](./deploiement.md).
