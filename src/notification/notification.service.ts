import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationService {
  private logger;
  constructor() {
    this.logger = new Logger('Notification Service');
  }

  async create(
    createNotificationInput: CreateNotificationInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const notification = await prisma.notification.create({
        data: {
          ...createNotificationInput,
        },
      });

      return notification;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.notificationWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.notificationWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const notification = await prisma.notification.findMany({
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

      return notification;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const notification = await prisma.notification.findFirst({
        where: {
          id,
        },
      });

      return notification;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateNotificationInput: UpdateNotificationInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const notification = await prisma.notification.update({
        where: {
          id,
        },
        data: {
          ...updateNotificationInput,
        },
      });

      return notification;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const notification = await prisma.notification.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return notification;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
