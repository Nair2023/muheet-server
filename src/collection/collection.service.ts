import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CollectionService {
  private logger;
  constructor() {
    this.logger = new Logger('Collection Service');
  }

  async create(
    createCollectionInput: CreateCollectionInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const collection = await prisma.collection.create({
        data: {
          ...createCollectionInput,
        },
      });

      return collection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.collectionWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.collectionWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const collection = await prisma.collection.findMany({
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

      return collection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const collection = await prisma.collection.findFirst({
        where: {
          id,
        },
      });

      return collection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateCollectionInput: UpdateCollectionInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const collection = await prisma.collection.update({
        where: {
          id,
        },
        data: {
          ...updateCollectionInput,
        },
      });

      return collection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const collection = await prisma.collection.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return collection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
