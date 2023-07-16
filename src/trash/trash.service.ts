import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateTrashInput } from './dto/create-trash.input';
import { UpdateTrashInput } from './dto/update-trash.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrashService {
  private logger;
  constructor() {
    this.logger = new Logger('Trash Service');
  }

  async create(
    createTrashInput: CreateTrashInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const trash = await prisma.trash.create({
        data: {
          ...createTrashInput,
        },
      });

      return trash;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.trashWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.trashWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const trash = await prisma.trash.findMany({
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

      return trash;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const trashes = await prisma.trash.findFirst({
        where: {
          id,
        },
      });

      return trashes;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateTrashInput: UpdateTrashInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const trash = await prisma.trash.update({
        where: {
          id,
        },
        data: {
          ...updateTrashInput,
        },
      });

      return trash;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
