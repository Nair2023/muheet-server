import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateTrashNoteInput } from './dto/create-trash-note.input';
import { UpdateTrashNoteInput } from './dto/update-trash-note.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrashNoteService {
  private logger;
  constructor() {
    this.logger = new Logger('TrashNote Service');
  }

  async create(
    createTrashNoteInput: CreateTrashNoteInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const trashNote = await prisma.trash_note.create({
        data: {
          ...createTrashNoteInput,
        },
      });

      return trashNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.trash_noteWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.trash_noteWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const trashNote = await prisma.trash_note.findMany({
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

      return trashNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const trashNote = await prisma.trash_note.findFirst({
        where: {
          id,
        },
      });

      return trashNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateTrashNoteInput: UpdateTrashNoteInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const trashNote = await prisma.trash_note.update({
        where: {
          id,
        },
        data: {
          ...updateTrashNoteInput,
        },
      });

      return trashNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const trashNote = await prisma.trash_note.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return trashNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
