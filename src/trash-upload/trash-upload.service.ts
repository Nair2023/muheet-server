import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateTrashUploadInput } from './dto/create-trash-upload.input';
import { UpdateTrashUploadInput } from './dto/update-trash-upload.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrashUploadService {
  private logger;
  constructor() {
    this.logger = new Logger('TrashUpload Service');
  }

  async create(
    createTrashUploadInput: CreateTrashUploadInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const trashUpload = await prisma.trash_upload.create({
        data: {
          ...createTrashUploadInput,
        },
      });

      return trashUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.trash_uploadWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.trash_uploadWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const trashUpload = await prisma.trash_upload.findMany({
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

      return trashUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const trashUpload = await prisma.trash_upload.findFirst({
        where: {
          id,
        },
      });

      return trashUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateTrashUploadInput: UpdateTrashUploadInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const trashUpload = await prisma.trash_upload.update({
        where: {
          id,
        },
        data: {
          ...updateTrashUploadInput,
        },
      });

      return trashUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const trashUpload = await prisma.trash_upload.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return trashUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
