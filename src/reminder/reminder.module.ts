import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { ReminderResolver } from './reminder.resolver';
import { PrismaService } from '../prisma.service';
import { ReminderController } from './reminder.controller';

@Module({
  providers: [ReminderResolver, ReminderService, PrismaService],
  controllers: [ReminderController],
})
export class ReminderModule {}
