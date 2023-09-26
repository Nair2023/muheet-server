import { Module } from '@nestjs/common';
import { DeadlineFighterService } from './deadline-fighter.service';
import { DeadlineFighterResolver } from './deadline-fighter.resolver';
import { PrismaService } from '../prisma.service';
import { DeadlineFighterController } from './deadline-fighter.controller';

@Module({
  providers: [DeadlineFighterResolver, DeadlineFighterService, PrismaService],
  controllers: [DeadlineFighterController],
})
export class DeadlineFighterModule {}
