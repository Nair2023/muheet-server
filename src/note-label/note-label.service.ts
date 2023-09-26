import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateNoteLabelInput } from './dto/create-note-label.input';
import { UpdateNoteLabelInput } from './dto/update-note-label.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class NoteLabelService {
  private logger;
  constructor() {
    this.logger = new Logger('NoteLabel Service');
  }

  async create(
    createNoteLabelInput: CreateNoteLabelInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const noteLabel = await prisma.note_label.create({
        data: {
          ...createNoteLabelInput,
        },
      });

      return noteLabel;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.note_labelWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.note_labelWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const noteLabel = await prisma.note_label.findMany({
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

      return noteLabel;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const noteLabel = await prisma.note_label.findFirst({
        where: {
          id,
        },
      });

      return noteLabel;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateNoteLabelInput: UpdateNoteLabelInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const noteLabel = await prisma.note_label.update({
        where: {
          id,
        },
        data: {
          ...updateNoteLabelInput,
        },
      });

      return noteLabel;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const noteLabel = await prisma.note_label.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return noteLabel;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
