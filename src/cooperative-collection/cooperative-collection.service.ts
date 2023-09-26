import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCooperativeCollectionInput } from './dto/create-cooperative-collection.input';
import { UpdateCooperativeCollectionInput } from './dto/update-cooperative-collection.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CooperativeCollectionService {
  private logger;
  constructor() {
    this.logger = new Logger('CooperativeCollection Service');
  }

  async create(
    createCooperativeCollectionInput: CreateCooperativeCollectionInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const cooperativeCollection = await prisma.cooperative_collection.create({
        data: {
          ...createCooperativeCollectionInput,
        },
      });

      return cooperativeCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.cooperative_collectionWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.cooperative_collectionWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const cooperativeCollection =
        await prisma.cooperative_collection.findMany({
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

      return cooperativeCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const cooperativeCollection =
        await prisma.cooperative_collection.findFirst({
          where: {
            id,
          },
        });

      return cooperativeCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateCooperativeCollectionInput: UpdateCooperativeCollectionInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const cooperativeCollection = await prisma.cooperative_collection.update({
        where: {
          id,
        },
        data: {
          ...updateCooperativeCollectionInput,
        },
      });

      return cooperativeCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const cooperativeCollection = await prisma.cooperative_collection.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return cooperativeCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
