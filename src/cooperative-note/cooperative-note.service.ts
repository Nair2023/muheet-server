import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCooperativeNoteInput } from './dto/create-cooperative-note.input';
import { UpdateCooperativeNoteInput } from './dto/update-cooperative-note.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CooperativeNoteService {
  private logger;
  constructor() {
    this.logger = new Logger('CooperativeNote Service');
  }

  async create(
    createCooperativeNoteInput: CreateCooperativeNoteInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const cooperativeNote = await prisma.cooperative_note.create({
        data: {
          ...createCooperativeNoteInput,
        },
      });

      return cooperativeNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.cooperative_noteWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.cooperative_noteWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const cooperativeNote = await prisma.cooperative_note.findMany({
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

      return cooperativeNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const cooperativeNote = await prisma.cooperative_note.findFirst({
        where: {
          id,
        },
      });

      return cooperativeNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateCooperativeNoteInput: UpdateCooperativeNoteInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const cooperativeNote = await prisma.cooperative_note.update({
        where: {
          id,
        },
        data: {
          ...updateCooperativeNoteInput,
        },
      });

      return cooperativeNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const cooperativeNote = await prisma.cooperative_note.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return cooperativeNote;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
