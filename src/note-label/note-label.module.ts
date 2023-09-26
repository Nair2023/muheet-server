import { Module } from '@nestjs/common';
import { NoteLabelService } from './note-label.service';
import { NoteLabelResolver } from './note-label.resolver';
import { PrismaService } from '../prisma.service';
import { NoteLabelController } from './note-label.controller';

@Module({
  providers: [NoteLabelResolver, NoteLabelService, PrismaService],
  controllers: [NoteLabelController],
})
export class NoteLabelModule {}
