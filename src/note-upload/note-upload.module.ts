import { Module } from '@nestjs/common';
import { NoteUploadService } from './note-upload.service';
import { NoteUploadResolver } from './note-upload.resolver';
import { PrismaService } from '../prisma.service';
import { NoteUploadController } from './note-upload.controller';

@Module({
  providers: [NoteUploadResolver, NoteUploadService, PrismaService],
  controllers: [NoteUploadController],
})
export class NoteUploadModule {}
