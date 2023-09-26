import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateNoteCollectionInput } from './dto/create-note-collection.input';
import { UpdateNoteCollectionInput } from './dto/update-note-collection.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class NoteCollectionService {
  private logger;
  constructor() {
    this.logger = new Logger('NoteCollection Service');
  }

  async create(
    createNoteCollectionInput: CreateNoteCollectionInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const noteCollection = await prisma.note_collection.create({
        data: {
          ...createNoteCollectionInput,
        },
      });

      return noteCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.note_collectionWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.note_collectionWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const noteCollection = await prisma.note_collection.findMany({
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

      return noteCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const noteCollection = await prisma.note_collection.findFirst({
        where: {
          id,
        },
      });

      return noteCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateNoteCollectionInput: UpdateNoteCollectionInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const noteCollection = await prisma.note_collection.update({
        where: {
          id,
        },
        data: {
          ...updateNoteCollectionInput,
        },
      });

      return noteCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const noteCollection = await prisma.note_collection.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return noteCollection;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
