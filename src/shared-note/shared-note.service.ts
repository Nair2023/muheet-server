import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateSharedNoteInput } from './dto/create-shared-note.input';
import { UpdateSharedNoteInput } from './dto/update-shared-note.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class SharedNoteService {
  private logger;
  constructor() {
    this.logger = new Logger('SharedNote Service');
  }

  async create(
    createSharedNoteInput: CreateSharedNoteInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const sharedNote = await prisma.shared_note.create({
        data: {
          ...createSharedNoteInput,
        },
      });

      return sharedNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.shared_noteWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.shared_noteWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const sharedNote = await prisma.shared_note.findMany({
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

      return sharedNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const sharedNote = await prisma.shared_note.findFirst({
        where: {
          id,
        },
      });

      return sharedNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateSharedNoteInput: UpdateSharedNoteInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const sharedNote = await prisma.shared_note.update({
        where: {
          id,
        },
        data: {
          ...updateSharedNoteInput,
        },
      });

      return sharedNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const sharedNote = await prisma.shared_note.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return sharedNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
