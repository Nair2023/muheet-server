import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';
import { PrismaService } from '../prisma.service';
import { NoteController } from './note.controller';

@Module({
  providers: [NoteResolver, NoteService, PrismaService],
  controllers: [NoteController],
})
export class NoteModule {}
