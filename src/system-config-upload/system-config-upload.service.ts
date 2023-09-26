import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateSystemConfigUploadInput } from './dto/create-system-config-upload.input';
import { UpdateSystemConfigUploadInput } from './dto/update-system-config-upload.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class SystemConfigUploadService {
  private logger;
  constructor() {
    this.logger = new Logger('SystemConfigUpload Service');
  }

  async create(
    createSystemConfigUploadInput: CreateSystemConfigUploadInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const systemConfigUpload = await prisma.system_config_upload.create({
        data: {
          ...createSystemConfigUploadInput,
        },
      });

      return systemConfigUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.system_config_uploadWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.system_config_uploadWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const systemConfigUpload = await prisma.system_config_upload.findMany({
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

      return systemConfigUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const systemConfigUpload = await prisma.system_config_upload.findFirst({
        where: {
          id,
        },
      });

      return systemConfigUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateSystemConfigUploadInput: UpdateSystemConfigUploadInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const systemConfigUpload = await prisma.system_config_upload.update({
        where: {
          id,
        },
        data: {
          ...updateSystemConfigUploadInput,
        },
      });

      return systemConfigUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const systemConfigUpload = await prisma.system_config_upload.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return systemConfigUpload;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
