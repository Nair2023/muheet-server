import { Module } from '@nestjs/common';
import { TrashNoteService } from './trash-note.service';
import { TrashNoteResolver } from './trash-note.resolver';
import { PrismaService } from '../prisma.service';
import { TrashNoteController } from './trash-note.controller';

@Module({
  providers: [TrashNoteResolver, TrashNoteService, PrismaService],
  controllers: [TrashNoteController],
})
export class TrashNoteModule {}
