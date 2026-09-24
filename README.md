# Indi Tekk

This is a web application built with Next.js, Prisma, Postgres, Tailwind, trigger.dev, and Mailjet.

## Getting Started

npm install

.env.example to .env

docker-compose up -d 

npx prisma db seed

npm run dev

To run the application locally, you will need to have Docker and Docker Compose installed. You will also need to create a `.env` file with a value for `DATABASE_URL` (see `env.example` for a complete reference.).
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First ensure that your database is up and your configuration is right.

```bash
npx prisma db push
npx prisma db seed
```

To push prisma migrations to your DB and add some seed data.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.
Login with staff@example.com / password

## Deployment
$ docker build -f Dockerfile-integration -t inclusiveit2024/inditekk:dev-1.0.0 .