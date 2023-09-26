import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateDeadlineFighterInput } from './dto/create-deadline-fighter.input';
import { UpdateDeadlineFighterInput } from './dto/update-deadline-fighter.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeadlineFighterService {
  private logger;
  constructor() {
    this.logger = new Logger('DeadlineFighter Service');
  }

  async create(
    createDeadlineFighterInput: CreateDeadlineFighterInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const deadlineFighter = await prisma.deadline_fighter.create({
        data: {
          ...createDeadlineFighterInput,
        },
      });

      return deadlineFighter;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.deadline_fighterWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.deadline_fighterWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const deadlineFighter = await prisma.deadline_fighter.findMany({
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

      return deadlineFighter;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const deadlineFighter = await prisma.deadline_fighter.findFirst({
        where: {
          id,
        },
      });

      return deadlineFighter;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateDeadlineFighterInput: UpdateDeadlineFighterInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const deadlineFighter = await prisma.deadline_fighter.update({
        where: {
          id,
        },
        data: {
          ...updateDeadlineFighterInput,
        },
      });

      return deadlineFighter;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const deadlineFighter = await prisma.deadline_fighter.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return deadlineFighter;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
