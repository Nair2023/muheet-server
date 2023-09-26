import { Module } from '@nestjs/common';
import { NoteCollectionService } from './note-collection.service';
import { NoteCollectionResolver } from './note-collection.resolver';
import { PrismaService } from '../prisma.service';
import { NoteCollectionController } from './note-collection.controller';

@Module({
  providers: [NoteCollectionResolver, NoteCollectionService, PrismaService],
  controllers: [NoteCollectionController],
})
export class NoteCollectionModule {}
