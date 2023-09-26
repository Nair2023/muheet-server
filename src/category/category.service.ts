import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  private logger;
  constructor() {
    this.logger = new Logger('Category Service');
  }

  async create(
    createCategoryInput: CreateCategoryInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const category = await prisma.category.create({
        data: {
          ...createCategoryInput,
        },
      });

      return category;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.categoryWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.categoryWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const category = await prisma.category.findMany({
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

      return category;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const category = await prisma.category.findFirst({
        where: {
          id,
        },
      });

      return category;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateCategoryInput: UpdateCategoryInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const category = await prisma.category.update({
        where: {
          id,
        },
        data: {
          ...updateCategoryInput,
        },
      });

      return category;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const category = await prisma.category.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return category;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
