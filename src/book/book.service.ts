import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.BookCreateInput) {
    return this.prisma.book.create({ data });
  }

  findAll() {
    return this.prisma.book.findMany({ include: { author: true } });
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id }, include: { author: true } });
  }

  update(id: number, data: Prisma.BookUpdateInput) {
    return this.prisma.book.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
