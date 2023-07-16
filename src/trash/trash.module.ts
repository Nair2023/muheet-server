import { Module } from '@nestjs/common';
import { TrashService } from './trash.service';
import { TrashResolver } from './trash.resolver';
import { PrismaService } from '../prisma.service';
import { TrashController } from './trash.controller';

@Module({
  providers: [TrashResolver, TrashService, PrismaService],
  controllers: [TrashController],
})
export class TrashModule {}
