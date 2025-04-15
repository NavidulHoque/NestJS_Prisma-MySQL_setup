import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.AuthorCreateInput) {
    return this.prisma.author.create({ data });
  }

  findAll() {
    return this.prisma.author.findMany({ include: { books: true, user: true } });
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({ where: { id }, include: { books: true, user: true } });
  }

  update(id: number, data: Prisma.AuthorUpdateInput) {
    return this.prisma.author.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.author.delete({ where: { id } });
  }
}
