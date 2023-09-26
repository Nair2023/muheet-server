import { Module } from '@nestjs/common';
import { CategoryLabelService } from './category-label.service';
import { CategoryLabelResolver } from './category-label.resolver';
import { PrismaService } from '../prisma.service';
import { CategoryLabelController } from './category-label.controller';

@Module({
  providers: [CategoryLabelResolver, CategoryLabelService, PrismaService],
  controllers: [CategoryLabelController],
})
export class CategoryLabelModule {}
