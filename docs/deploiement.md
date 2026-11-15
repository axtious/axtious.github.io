# Lancement sur GitHub Pages

Le dépôt prépare un site Astro statique pour **`https://taous.deneuve.xyz`**. Étienne raccordera le DNS lorsque le contenu et le thème seront prêts.

La configuration du code, le paramétrage de GitHub Pages et le DNS sont trois étapes distinctes. Un build réussi confirme que le site se génère ; il ne confirme pas que le domaine répond.

## Préparation dans le dépôt

- L’URL de production doit rester `https://taous.deneuve.xyz`.
- Aucun `base: '/axtious.github.io'` : ce blog est servi à la racine du domaine.
- Astro génère les fichiers statiques dans `dist/`.
- `public/CNAME` contient le domaine prévu, sans protocole ni chemin.
- Les workflows utilisent des runners GitHub standards.
- La vérification précède le déploiement. Les brouillons et contenus futurs sont exclus de la production.

**Attention au domaine personnalisé :** avec un workflow GitHub Actions, GitHub indique que les fichiers `CNAME` sont ignorés. Le domaine doit aussi être enregistré dans **Settings → Pages → Custom domain**. Le fichier du dépôt sert de repère et ne réalise pas cette configuration à lui seul.

## Lorsque le lancement est validé

### 1. Vérifier le code

Exécuter `npm ci`, puis `npm run validate`. Examiner les pages générées avec `npm run preview`, y compris sur mobile. Vérifier que seuls les articles approuvés sont destinés à la production.

Fusionner la pull request de préparation lorsque son contenu est validé. Une fusion sur `main` peut déclencher le workflow de déploiement : effectuer le paramétrage Pages en coordination avec cette étape.

### 2. Configurer GitHub Pages

Dans le dépôt `axtious/axtious.github.io` :

1. Ouvrir **Settings → Pages**.
2. Dans **Build and deployment**, choisir **GitHub Actions** comme source.
3. Renseigner **`taous.deneuve.xyz`** dans **Custom domain** au moment du raccordement.
4. Vérifier que le workflow de déploiement aboutit et que l’environnement `github-pages` autorise la branche `main`.

Si le workflow signale qu’aucun site Pages n’existe, activer d’abord Pages dans ces réglages, puis relancer le déploiement. Ne remplacer ni le build ni son contrôle par un simple envoi des sources Astro : GitHub doit recevoir le dossier généré `dist/`.

### 3. Raccorder le DNS avec Étienne

Pour le sous-domaine demandé, la configuration attendue est :

| Type    | Nom     | Cible               |
| ------- | ------- | ------------------- |
| `CNAME` | `taous` | `axtious.github.io` |

Le fournisseur DNS peut demander le nom complet `taous.deneuve.xyz` ou ajouter automatiquement `deneuve.xyz`. La cible ne contient ni `https://` ni chemin. Il ne faut pas mettre le nom du dépôt dans la cible.

GitHub recommande de vérifier la propriété du domaine avant son rattachement. Le cas échéant, utiliser le nom et la valeur TXT fournis dans les paramètres GitHub, sans les inventer. Étienne peut effectuer cette vérification avec le DNS.

### 4. Activer et contrôler HTTPS

Après validation DNS et émission du certificat par GitHub, activer **Enforce HTTPS** dans Pages. La mise à disposition du certificat peut nécessiter un délai ; consulter l’état affiché par GitHub.

Vérifier ensuite :

- l’accueil et les pages principales sur `https://taous.deneuve.xyz` ;
- un article publié, ses liens et ses images ;
- les URL canoniques et métadonnées de partage ;
- le flux RSS, le sitemap et `robots.txt` ;
- la page 404 et l’absence d’articles brouillons ou futurs ;
- la redirection de HTTP vers HTTPS.

## Après le lancement

Une modification fusionnée sur la branche de production est reconstruite par GitHub Actions. Vérifier la CI, le déploiement, puis la page publique concernée. Si un article est prévu pour une date future, déclencher un nouveau build à partir de cette date : le filtrage statique ne constitue pas une planification automatique.

## Documentation officielle

- [Déployer Astro sur GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Configurer un domaine personnalisé GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Vérifier son domaine personnalisé](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [Sécuriser un site GitHub Pages avec HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
