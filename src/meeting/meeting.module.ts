import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingResolver } from './meeting.resolver';
import { PrismaService } from '../prisma.service';
import { MeetingController } from './meeting.controller';

@Module({
  providers: [MeetingResolver, MeetingService, PrismaService],
  controllers: [MeetingController],
})
export class MeetingModule {}
