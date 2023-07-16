import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { PrismaService } from '../prisma.service';
import { TagController } from './tag.controller';

@Module({
  providers: [TagResolver, TagService, PrismaService],
  controllers: [TagController],
})
export class TagModule {}
