import { Module } from '@nestjs/common';
import { MeetingInviteeService } from './meeting-invitee.service';
import { MeetingInviteeResolver } from './meeting-invitee.resolver';
import { PrismaService } from '../prisma.service';
import { MeetingInviteeController } from './meeting-invitee.controller';

@Module({
  providers: [MeetingInviteeResolver, MeetingInviteeService, PrismaService],
  controllers: [MeetingInviteeController],
})
export class MeetingInviteeModule {}
