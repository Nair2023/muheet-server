import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagService {
  private logger;
  constructor() {
    this.logger = new Logger('Tag Service');
  }

  async create(
    createTagInput: CreateTagInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const tag = await prisma.tag.create({
        data: {
          ...createTagInput,
        },
      });

      return tag;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.tagWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.tagWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const tag = await prisma.tag.findMany({
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

      return tag;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const tags = await prisma.tag.findFirst({
        where: {
          id,
        },
      });

      return tags;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateTagInput: UpdateTagInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const tag = await prisma.tag.update({
        where: {
          id,
        },
        data: {
          ...updateTagInput,
        },
      });

      return tag;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const tag = await prisma.tag.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return tag;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
