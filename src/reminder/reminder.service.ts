import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateReminderInput } from './dto/create-reminder.input';
import { UpdateReminderInput } from './dto/update-reminder.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReminderService {
  private logger;
  constructor() {
    this.logger = new Logger('Reminder Service');
  }

  async create(
    createReminderInput: CreateReminderInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const reminder = await prisma.reminder.create({
        data: {
          ...createReminderInput,
        },
      });

      return reminder;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.reminderWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.reminderWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const reminder = await prisma.reminder.findMany({
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

      return reminder;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const reminder = await prisma.reminder.findFirst({
        where: {
          id,
        },
      });

      return reminder;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateReminderInput: UpdateReminderInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const reminder = await prisma.reminder.update({
        where: {
          id,
        },
        data: {
          ...updateReminderInput,
        },
      });

      return reminder;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const reminder = await prisma.reminder.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return reminder;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
