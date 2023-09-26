import { Module } from '@nestjs/common';
import { CooperativeNoteService } from './cooperative-note.service';
import { CooperativeNoteResolver } from './cooperative-note.resolver';
import { PrismaService } from '../prisma.service';
import { CooperativeNoteController } from './cooperative-note.controller';

@Module({
  providers: [CooperativeNoteResolver, CooperativeNoteService, PrismaService],
  controllers: [CooperativeNoteController],
})
export class CooperativeNoteModule {}
