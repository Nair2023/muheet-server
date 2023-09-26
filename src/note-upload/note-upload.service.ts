import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateNoteUploadInput } from './dto/create-note-upload.input';
import { UpdateNoteUploadInput } from './dto/update-note-upload.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class NoteUploadService {
  private logger;
  constructor() {
    this.logger = new Logger('NoteUpload Service');
  }

  async create(
    createNoteUploadInput: CreateNoteUploadInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const noteUpload = await prisma.note_upload.create({
        data: {
          ...createNoteUploadInput,
        },
      });

      return noteUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.note_uploadWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.note_uploadWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const noteUpload = await prisma.note_upload.findMany({
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

      return noteUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const noteUpload = await prisma.note_upload.findFirst({
        where: {
          id,
        },
      });

      return noteUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateNoteUploadInput: UpdateNoteUploadInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const noteUpload = await prisma.note_upload.update({
        where: {
          id,
        },
        data: {
          ...updateNoteUploadInput,
        },
      });

      return noteUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const noteUpload = await prisma.note_upload.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return noteUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
