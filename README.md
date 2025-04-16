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

## 🛠️ Step 4: Modify env and schema.prisma

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

## 🛠️ Step 5: Setup Docker and run phpMyAdmin

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

## 🛠️ Step 11: Run Prisma Studio Server

```bash
npx prisma studio
```

Prisma server will run in another port 5555

## 🛠️ Step 12: Start Building APIs

Now you can:
- ✅ Create UserController (nest generate controller user).
- ✅ Add REST/GraphQL endpoints.
- ✅ Extend your schema with new models.

# Deployment

This project is a NestJS backend application connected to a MySQL database hosted on [Railway](https://railway.app/).

## 🚀 Deployment Summary

- **Backend**: NestJS (deployed to [Render](https://render.com) or similar platform)
- **Database**: MySQL (hosted on [Railway](https://railway.app))
- **ORM**: Prisma
- **Schema Management**: Prisma Migrations
- **Cloud Database Access**: SQLTools (VS Code extension)

## Deployment of MySQL

## 🛠️ Step 1: Get the Railway database URL

- Go to [Railway](https://railway.app).
- Click deploy a new project. 
- Click deploy mysql.
- Wait for a moment while MySQL db being created.
- Click connect button at top right.
- Copy public network's connection URL and paste it in DATABASE_URL in .env or when deploying NestJS in render or other platform then copy paste the url in DATABASE_URL.

## 🛠️ Step 2: Sync Prisma Schema to Railway MySQL

```bash
npx prisma generate
npx prisma migrate deploy
```

## 🛠️ Step 3: Connecting to Railway MySQL via VS Code

- Install SQLTools extension in VS Code.
- Install MySQL Driver for SQLTools.
- Open the SQLTools Connections panel.
- Create a new connection with the following settings:

```bash
Name: Railway Cloud
Driver: MySQL/MariaDB
Server: metro.proxy.rlwy.net  #can vary from the connection url
Port: 46923  #can vary from the connection url
Database: railway  # you can name anything of the database from the connection url
Username: root
Password: cgnYLBOFoCtjUjJDtVypZqaXejBUcqJR  #can vary from the connection url
```

- Click "Save and Connect" to access the cloud database.

## Deployment of NestJS

- Go to [Render](https://render.com)
- Create a new Web Service from your GitHub repo 
- Build Command:

```bash
npm install && npx prisma generate && npm run build
```

- Start Command:

```bash
npm run start:prod
```

- Add this in Environment Variables:

```bash
DATABASE_URL = mysql://root:cgnYLBOFoCtjUjJDtVypZqaXejBUcqJR@metro.proxy.rlwy.net:46923/railway  # can vary from railway connection url
```

- Then deploy.

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

- Delete node_modules, reinstall (npm install).
- If it doesn't solves the issue then uninstall one drive or remove one drive from your nest js project. It sometimes create permission problems in node_modules

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