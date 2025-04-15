# NestJS + MySQL + Prisma Setup Guide

A step-by-step guide to setting up a NestJS project with MySQL and Prisma ORM.

---

## 🛠️ Step 1: Create a NestJS Project

```bash
npm i -g @nestjs/cli
nest new prisma-mysql
```

## 🛠️ Step 2: Install Prisma and Prisma Client

```bash
npm install prisma --save-dev
npm install @prisma/client
```

## 🛠️ Step 3: Initialize Prisma

```bash
npx prisma init --datasource-provider mysql
```

## 🛠️ Step 4: Setup Docker and run phpMyAdmin

If you don’t have Docker installed locally,

###  Step-by-Step

### 1. Install Docker

If you don’t already have Docker installed, [download it here](https://www.docker.com/products/docker-desktop/) and make sure it’s running

### 2. Use docker-compose.yml

```bash
services:
  mysql:
    image: mysql:8.4.3
    restart: always
    ports:
      - 3306:3306
    volumes:
      - ./mysql:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_TCP_PORT=3306
  phpMyAdmin:
    image: phpmyadmin
    restart: always
    ports:
      - 8080:80
    environment:
      - PMA_ARBITRARY=1
```

### 3. Start phpMyAdmin Server

```bash
docker compose up
```

Now you can find phpMyAdmin server on port 8080
- server - mysql
- username - root
- password - root 

## 🛠️ Step 5: Modify env and schema.prisma

### 1. schema.prisma

You will see in schema.prisma,

```bash
generator client {
  provider = "prisma-client-js"
  output   = "../generator/prisma"
}
```

Remove output field,

```bash
generator client {
  provider = "prisma-client-js"
}
```

### 2. env

You will see in env,

```bash
DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"
```

replace it with,

```bash
DATABASE_URL="mysql://root:root@localhost:3306/anyDatabaseName"
```

## 🛠️ Step 6: Add a Schema in schema.prisma

For example,

```bash
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  phone     String?
  createdAt DateTime @default(now())
}
```

## 🛠️ Step 7: Syncing Prisma to MySql Database

```bash
# Added a User model
npx prisma migrate dev --name add-user-model

# Added a new field to User
npx prisma migrate dev --name add-phone-to-user
```

You need to run this command whenever there are changes in your prisma schema and give a meaningful name what kind of changes you made in your schema

## 🛠️ Step 8: Generate Prisma Client

```bash
npx prisma generate
```

Whenever there is a change in schema, then you need to run it again

## 🛠️ Step 8: Create a Prisma Service in NestJS

```bash
npx nest g module prisma
npx nest g service prisma
```

## 🛠️ Step 9: Update prisma.service.ts

```bash
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

## 🛠️ Step 10: Register it in prisma.module.ts

```bash
@Injectable()
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

## 🛠️ Step 11: Start Building APIs

Now you can:
- ✅ Create UserController (nest generate controller user).
- ✅ Add REST/GraphQL endpoints.
- ✅ Extend your schema with new models.

## 🔧 Troubleshooting

### Prisma not initialized?

- Run

```bash
npx prisma generate
```
- Then restart the NestJS Server 

### MySQL connection failed?

- Check .env and MySQL server status.

### Cannot find module '@prisma/client'?

- Delete node_modules and reinstall (npm install).

--- 

## 📜 License

MIT

### 🎉 Success!
Your NestJS + MySQL + Prisma setup is complete. 

🚀 Next Steps:

- Add authentication (@nestjs/passport).
- Deploy to production (Docker + AWS/Heroku).
- Explore Prisma relations (1-to-1, 1-to-many).

Happy coding! 💻🔥