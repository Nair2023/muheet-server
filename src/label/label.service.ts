import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class LabelService {
  private logger;
  constructor() {
    this.logger = new Logger('Label Service');
  }

  async create(
    createLabelInput: CreateLabelInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const label = await prisma.label.create({
        data: {
          ...createLabelInput,
        },
      });

      return label;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.labelWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.labelWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const label = await prisma.label.findMany({
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

      return label;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const labels = await prisma.label.findFirst({
        where: {
          id,
        },
      });

      return labels;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateLabelInput: UpdateLabelInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const label = await prisma.label.update({
        where: {
          id,
        },
        data: {
          ...updateLabelInput,
        },
      });

      return label;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const label = await prisma.label.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return label;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
