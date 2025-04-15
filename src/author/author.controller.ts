import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Prisma } from '@prisma/client';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() data: Prisma.AuthorCreateInput) {
    return this.authorService.create(data);
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.AuthorUpdateInput) {
    return this.authorService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
