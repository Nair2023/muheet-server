import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateDeadlineInput } from './dto/create-deadline.input';
import { UpdateDeadlineInput } from './dto/update-deadline.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeadlineService {
  private logger;
  constructor() {
    this.logger = new Logger('Deadline Service');
  }

  async create(
    createDeadlineInput: CreateDeadlineInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const deadline = await prisma.deadline.create({
        data: {
          ...createDeadlineInput,
        },
      });

      return deadline;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.deadlineWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.deadlineWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const deadline = await prisma.deadline.findMany({
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

      return deadline;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const deadline = await prisma.deadline.findFirst({
        where: {
          id,
        },
      });

      return deadline;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateDeadlineInput: UpdateDeadlineInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const deadline = await prisma.deadline.update({
        where: {
          id,
        },
        data: {
          ...updateDeadlineInput,
        },
      });

      return deadline;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const deadline = await prisma.deadline.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return deadline;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
