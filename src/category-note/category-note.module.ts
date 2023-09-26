import { Module } from '@nestjs/common';
import { CategoryNoteService } from './category-note.service';
import { CategoryNoteResolver } from './category-note.resolver';
import { PrismaService } from '../prisma.service';
import { CategoryNoteController } from './category-note.controller';

@Module({
  providers: [CategoryNoteResolver, CategoryNoteService, PrismaService],
  controllers: [CategoryNoteController],
})
export class CategoryNoteModule {}
