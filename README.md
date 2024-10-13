# Twist API

API Clone of [Spoonacular-API](https://spoonacular.com/food-api/docs)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://dylanbollaro.ovh/fr)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://github.com/DylanBOLLARO/)
[![github](https://img.shields.io/badge/github-333?style=for-the-badge&logo=github&logoColor=white)](https://www.linkedin.com/in/dylan-bollaro-b117301ab/)

## Tech Stack

**Server:** NestJS, PrismaORM, PostgreSQL, Docker

## Environment Variables

To run this project, you'll need to configure all the environment variables listed in the .env.template file and save them in a .env file.

## Deployment

```bash
docker compose up -d
```

Then you need to connect to the Docker container running NestJS and execute the command below to synchronize the PostgreSQL instance with the schema.

```bash
npx prisma db push --force-reset
```
