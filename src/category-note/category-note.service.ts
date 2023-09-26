import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCategoryNoteInput } from './dto/create-category-note.input';
import { UpdateCategoryNoteInput } from './dto/update-category-note.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryNoteService {
  private logger;
  constructor() {
    this.logger = new Logger('CategoryNote Service');
  }

  async create(
    createCategoryNoteInput: CreateCategoryNoteInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const categoryNote = await prisma.category_note.create({
        data: {
          ...createCategoryNoteInput,
        },
      });

      return categoryNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.category_noteWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.category_noteWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const categoryNote = await prisma.category_note.findMany({
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

      return categoryNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const categoryNote = await prisma.category_note.findFirst({
        where: {
          id,
        },
      });

      return categoryNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateCategoryNoteInput: UpdateCategoryNoteInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const categoryNote = await prisma.category_note.update({
        where: {
          id,
        },
        data: {
          ...updateCategoryNoteInput,
        },
      });

      return categoryNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const categoryNote = await prisma.category_note.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return categoryNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
