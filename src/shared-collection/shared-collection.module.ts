import { Module } from '@nestjs/common';
import { SharedCollectionService } from './shared-collection.service';
import { SharedCollectionResolver } from './shared-collection.resolver';
import { PrismaService } from '../prisma.service';
import { SharedCollectionController } from './shared-collection.controller';

@Module({
  providers: [SharedCollectionResolver, SharedCollectionService, PrismaService],
  controllers: [SharedCollectionController],
})
export class SharedCollectionModule {}
