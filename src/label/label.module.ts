import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelResolver } from './label.resolver';
import { PrismaService } from '../prisma.service';
import { LabelController } from './label.controller';

@Module({
  providers: [LabelResolver, LabelService, PrismaService],
  controllers: [LabelController],
})
export class LabelModule {}
