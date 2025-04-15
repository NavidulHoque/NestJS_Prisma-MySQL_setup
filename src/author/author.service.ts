import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.AuthorCreateInput) {
    try {
      const createdAuthor = await this.prisma.author.create({ data });
      return createdAuthor
    }

    catch (error) {
      console.log(error)
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const authors = await this.prisma.author.findMany({
      select: {
        id: true,
        name: true,
        bio: true,
        phone: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        books: true
      }
    });
    return authors
  }

  findOne(id: number) {
    //working in asynchronous way behind the scenes
    return this.prisma.author.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        bio: true,
        phone: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        books: true
      }
    });
  }

  update(id: number, data: Prisma.AuthorUpdateInput) {
    return this.prisma.author.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.author.delete({ where: { id } });
  }
}
