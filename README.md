# Malaika Care

Malaika Care est le pôle d'aide, de soins et de coordination à domicile de Malaika Conseils et Services, basé au Sénégal. Ce dépôt contient une application web Next.js avec un site vitrine et les premiers écrans d'un espace de gestion.

## Fonctionnalités présentes

- Présentation des services de soins à domicile, d'aide à la personne et de coordination.
- Formulaires de demande de devis et de contact.
- Authentification et pages de profil client et professionnel.
- Consultation et gestion des demandes, clients et intervenants dans le back-office.
- Modèles de données pour les clients, les professionnels, les demandes, les documents et les interventions.

Certaines parties du back-office sont encore en cours de développement. En particulier, le tableau de bord contient des données d'exemple pour les interventions. Le dépôt de fichiers est actuellement prévu sous `public/file`; ne pas y placer de documents personnels ou médicaux destinés à rester privés.

## Technologies

- Next.js 14 et React
- TypeScript et Tailwind CSS
- Prisma ORM
- Base de données relationnelle

## Prérequis

- Node.js et npm
- Une base de données correspondant au fournisseur Prisma configuré dans `prisma/schema.prisma` (MySQL actuellement)
- Les variables d'environnement nécessaires à la base de données, aux sessions et à l'envoi d'e-mails

> **Configuration à vérifier :** le schéma Prisma est configuré pour MySQL, tandis que les fichiers Docker Compose et `.env.example` du dépôt font référence à PostgreSQL. Aligner ces configurations avant de préparer la base ou de lancer l'application.

## Développement local

1. Installer les dépendances :

   ```bash
   npm install
   ```

2. Configurer les variables d'environnement dans `.env` : au minimum `DATABASE_URL`, `BASE_URL` et `JWT_SECRET`. Ajouter les variables du fournisseur d'e-mail si l'envoi d'e-mails doit être utilisé.

3. Générer le client Prisma :

   ```bash
   npx prisma generate
   ```

4. Démarrer Next.js :

   ```bash
   npm run dev
   ```

Next.js démarre sur [http://localhost:3000](http://localhost:3000) par défaut. Les images Docker du dépôt exposent le port `4000`.

## Scripts disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur Next.js de développement. |
| `npm run build` | Compile l'application Next.js. |
| `npm run build:integration` | Compile avec `.env.integration`. |
| `npm run start` | Démarre l'application compilée avec `.env.integration`. |
| `npm run lint` | Lance le lint Next.js. |
| `npm test` | Lance Vitest. |
| `npm run test:e2e` | Lance les scénarios Playwright. |

## Structure principale

- `app/(user)` : site vitrine et espace client Care
- `app/backoffice` : interface de gestion
- `app/auth` : connexion, inscription et récupération du mot de passe
- `app/api` : routes API
- `Services` et `lib` : accès aux données, logique métier et utilitaires
- `prisma` : schéma, migrations et données de référence
- `images` : visuels de la marque et du site
