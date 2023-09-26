import { Module } from '@nestjs/common';
import { DeadlineService } from './deadline.service';
import { DeadlineResolver } from './deadline.resolver';
import { PrismaService } from '../prisma.service';
import { DeadlineController } from './deadline.controller';

@Module({
  providers: [DeadlineResolver, DeadlineService, PrismaService],
  controllers: [DeadlineController],
})
export class DeadlineModule {}
