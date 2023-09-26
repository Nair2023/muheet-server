import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUploadInput } from './dto/create-upload.input';
import { UpdateUploadInput } from './dto/update-upload.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class UploadService {
  private logger;
  constructor() {
    this.logger = new Logger('Upload Service');
  }

  async create(
    createUploadInput: CreateUploadInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const upload = await prisma.upload.create({
        data: {
          ...createUploadInput,
        },
      });

      return upload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.uploadWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.uploadWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const upload = await prisma.upload.findMany({
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

      return upload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const upload = await prisma.upload.findFirst({
        where: {
          id,
        },
      });

      return upload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateUploadInput: UpdateUploadInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const upload = await prisma.upload.update({
        where: {
          id,
        },
        data: {
          ...updateUploadInput,
        },
      });

      return upload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      await prisma.upload.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
