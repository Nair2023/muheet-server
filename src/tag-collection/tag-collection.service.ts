import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateTagCollectionInput } from './dto/create-tag-collection.input';
import { UpdateTagCollectionInput } from './dto/update-tag-collection.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagCollectionService {
  private logger;
  constructor() {
    this.logger = new Logger('TagCollection Service');
  }

  async create(
    createTagCollectionInput: CreateTagCollectionInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const tagCollection = await prisma.tag_collection.create({
        data: {
          ...createTagCollectionInput,
        },
      });

      return tagCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.tag_collectionWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.tag_collectionWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const tagCollection = await prisma.tag_collection.findMany({
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

      return tagCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const tagCollection = await prisma.tag_collection.findFirst({
        where: {
          id,
        },
      });

      return tagCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateTagCollectionInput: UpdateTagCollectionInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const tagCollection = await prisma.tag_collection.update({
        where: {
          id,
        },
        data: {
          ...updateTagCollectionInput,
        },
      });

      return tagCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const tagCollection = await prisma.tag_collection.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return tagCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
