import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateMeetingInviteeInput } from './dto/create-meeting-invitee.input';
import { UpdateMeetingInviteeInput } from './dto/update-meeting-invitee.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class MeetingInviteeService {
  private logger;
  constructor() {
    this.logger = new Logger('MeetingInvitee Service');
  }

  async create(
    createMeetingInviteeInput: CreateMeetingInviteeInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const meetingInvitee = await prisma.meeting_invitee.create({
        data: {
          ...createMeetingInviteeInput,
        },
      });

      return meetingInvitee;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.meeting_inviteeWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.meeting_inviteeWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const meetingInvitee = await prisma.meeting_invitee.findMany({
        where,
        ...(page && {
          ...(page && {
            skip: Number(pageSize) * (page - 1),
            take: Number(pageSize),
          }),
        }),
        orderBy: {
          id: 'desc',
        },
      });

      return meetingInvitee;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const meetingInvitee = await prisma.meeting_invitee.findFirst({
        where: {
          id,
        },
      });

      return meetingInvitee;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateMeetingInviteeInput: UpdateMeetingInviteeInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const meetingInvitee = await prisma.meeting_invitee.update({
        where: {
          id,
        },
        data: {
          ...updateMeetingInviteeInput,
        },
      });

      return meetingInvitee;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const meetingInvitee = await prisma.meeting_invitee.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return meetingInvitee;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
