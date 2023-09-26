import { Module } from '@nestjs/common';
import { CooperativeCollectionService } from './cooperative-collection.service';
import { CooperativeCollectionResolver } from './cooperative-collection.resolver';
import { PrismaService } from '../prisma.service';
import { CooperativeCollectionController } from './cooperative-collection.controller';

@Module({
  providers: [
    CooperativeCollectionResolver,
    CooperativeCollectionService,
    PrismaService,
  ],
  controllers: [CooperativeCollectionController],
})
export class CooperativeCollectionModule {}
