import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [NoteResolver, NoteService, PrismaService],
})
export class NoteModule {}
