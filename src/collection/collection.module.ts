import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionResolver } from './collection.resolver';
import { PrismaService } from '../prisma.service';
import { CollectionController } from './collection.controller';

@Module({
  providers: [CollectionResolver, CollectionService, PrismaService],
  controllers: [CollectionController],
})
export class CollectionModule {}
