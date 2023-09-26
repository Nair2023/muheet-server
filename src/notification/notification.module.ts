import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { PrismaService } from '../prisma.service';
import { NotificationController } from './notification.controller';

@Module({
  providers: [NotificationResolver, NotificationService, PrismaService],
  controllers: [NotificationController],
})
export class NotificationModule {}
