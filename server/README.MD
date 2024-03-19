<p align="center">
  <a href="https://fastify.dev/" target="blank"><img src="https://fastify.dev/img/logos/fastify-black.svg" width="300" alt="Fastify Logo" /></a>
</p>

# Fastify Server

This project is built with Fastify, Prisma, and Typescript. It can connect to a PostgreSQL database and has a basic user authentication system.

## How to run

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the root directory and add the following environment variables from `.env.example` and place your db connection and openssl key as secret.

3. Create a database and run the migrations. Or you can use the prisma cli to push to db. Paste empty db connection string in the `.env` and run `npx prisma db push`. Check db if the tables are created.

4. Run the server and curl healthcheck on your configured port

```bash
curl --location 'http://localhost:8080/healthcheck'
```

5. Server is running and can check the other routes. No swagger ui documentation for now as the setup is too tedious and not worth it for me. Postman API collection is inside root directory. Or go to this [postman link](https://www.postman.com/hrithiqball/workspace/public-harith-repository/collection/24832089-bf3fa1ff-5c1f-4aa6-8361-239c760dd0aa?action=share&creator=24832089) as reference.

##### Command

ESLint

```bash
npm init @eslint/config
```

Typescript

```bash
npx tsc --init
```

Prisma

```bash
npx prisma init --datasource-provider postgresql
```

#### TODO:

- add swagger and swagger-ui
