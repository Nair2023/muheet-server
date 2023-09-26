import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { PrismaService } from '../prisma.service';
import { CategoryController } from './category.controller';

@Module({
  providers: [CategoryResolver, CategoryService, PrismaService],
  controllers: [CategoryController],
})
export class CategoryModule {}
