import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCategoryLabelInput } from './dto/create-category-label.input';
import { UpdateCategoryLabelInput } from './dto/update-category-label.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryLabelService {
  private logger;
  constructor() {
    this.logger = new Logger('CategoryLabel Service');
  }

  async create(
    createCategoryLabelInput: CreateCategoryLabelInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const categoryLabel = await prisma.category_label.create({
        data: {
          ...createCategoryLabelInput,
        },
      });

      return categoryLabel;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.category_labelWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.category_labelWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const categoryLabel = await prisma.category_label.findMany({
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

      return categoryLabel;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const categoryLabel = await prisma.category_label.findFirst({
        where: {
          id,
        },
      });

      return categoryLabel;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateCategoryLabelInput: UpdateCategoryLabelInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const categoryLabel = await prisma.category_label.update({
        where: {
          id,
        },
        data: {
          ...updateCategoryLabelInput,
        },
      });

      return categoryLabel;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const categoryLabel = await prisma.category_label.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return categoryLabel;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
