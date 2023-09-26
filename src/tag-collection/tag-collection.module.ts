import { Module } from '@nestjs/common';
import { TagCollectionService } from './tag-collection.service';
import { TagCollectionResolver } from './tag-collection.resolver';
import { PrismaService } from '../prisma.service';
import { TagCollectionController } from './tag-collection.controller';

@Module({
  providers: [TagCollectionResolver, TagCollectionService, PrismaService],
  controllers: [TagCollectionController],
})
export class TagCollectionModule {}
