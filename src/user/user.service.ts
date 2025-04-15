// src/user/user.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.UserCreateInput) {
    try {
      const createdUser = await this.prisma.user.create({ data });
      return createdUser
    }

    catch (error) {
      console.log(error.message)
      throw new BadRequestException('User already exists')
    }
  }
}
