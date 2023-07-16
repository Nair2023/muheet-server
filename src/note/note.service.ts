import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class NoteService {
  private logger;
  constructor() {
    this.logger = new Logger('Note Service');
  }

  async create(
    createNoteInput: CreateNoteInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const note = await prisma.note.create({
        data: {
          ...createNoteInput,
        },
      });

      return note;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.noteWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.noteWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const note = await prisma.note.findMany({
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

      return note;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const notes = await prisma.note.findFirst({
        where: {
          id,
        },
      });

      return notes;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateNoteInput: UpdateNoteInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const note = await prisma.note.update({
        where: {
          id,
        },
        data: {
          ...updateNoteInput,
        },
      });

      return note;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const note = await prisma.note.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return note;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
