import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateSharedCollectionInput } from './dto/create-shared-collection.input';
import { UpdateSharedCollectionInput } from './dto/update-shared-collection.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class SharedCollectionService {
  private logger;
  constructor() {
    this.logger = new Logger('SharedCollection Service');
  }

  async create(
    createSharedCollectionInput: CreateSharedCollectionInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const sharedCollection = await prisma.shared_collection.create({
        data: {
          ...createSharedCollectionInput,
        },
      });

      return sharedCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.shared_collectionWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.shared_collectionWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const sharedCollection = await prisma.shared_collection.findMany({
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

      return sharedCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const sharedCollection = await prisma.shared_collection.findFirst({
        where: {
          id,
        },
      });

      return sharedCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateSharedCollectionInput: UpdateSharedCollectionInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const sharedCollection = await prisma.shared_collection.update({
        where: {
          id,
        },
        data: {
          ...updateSharedCollectionInput,
        },
      });

      return sharedCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const sharedCollection = await prisma.shared_collection.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return sharedCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
