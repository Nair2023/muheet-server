import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class MeetingService {
  private logger;
  constructor() {
    this.logger = new Logger('Meeting Service');
  }

  async create(
    createMeetingInput: CreateMeetingInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const meeting = await prisma.meeting.create({
        data: {
          ...createMeetingInput,
        },
      });

      return meeting;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.meetingWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.meetingWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const meeting = await prisma.meeting.findMany({
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

      return meeting;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const meeting = await prisma.meeting.findFirst({
        where: {
          id,
        },
      });

      return meeting;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateMeetingInput: UpdateMeetingInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const meeting = await prisma.meeting.update({
        where: {
          id,
        },
        data: {
          ...updateMeetingInput,
        },
      });

      return meeting;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const meeting = await prisma.meeting.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return meeting;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
