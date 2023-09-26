import { Module } from '@nestjs/common';
import { SharedNoteService } from './shared-note.service';
import { SharedNoteResolver } from './shared-note.resolver';
import { PrismaService } from '../prisma.service';
import { SharedNoteController } from './shared-note.controller';

@Module({
  providers: [SharedNoteResolver, SharedNoteService, PrismaService],
  controllers: [SharedNoteController],
})
export class SharedNoteModule {}
