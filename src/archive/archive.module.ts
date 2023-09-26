import { Module } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { ArchiveResolver } from './archive.resolver';
import { PrismaService } from '../prisma.service';
import { ArchiveController } from './archive.controller';

@Module({
  providers: [ArchiveResolver, ArchiveService, PrismaService],
  controllers: [ArchiveController],
})
export class ArchiveModule {}
