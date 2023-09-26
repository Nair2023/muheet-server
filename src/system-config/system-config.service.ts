import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateSystemConfigInput } from './dto/create-system-config.input';
import { UpdateSystemConfigInput } from './dto/update-system-config.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class SystemConfigService {
  private logger;
  constructor() {
    this.logger = new Logger('SystemConfig Service');
  }

  async create(
    createSystemConfigInput: CreateSystemConfigInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const systemConfig = await prisma.system_config.create({
        data: {
          ...createSystemConfigInput,
        },
      });

      return systemConfig;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.system_configWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.system_configWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const systemConfig = await prisma.system_config.findMany({
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

      return systemConfig;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const systemConfig = await prisma.system_config.findFirst({
        where: {
          id,
        },
      });

      return systemConfig;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateSystemConfigInput: UpdateSystemConfigInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const systemConfig = await prisma.system_config.update({
        where: {
          id,
        },
        data: {
          ...updateSystemConfigInput,
        },
      });

      return systemConfig;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const systemConfig = await prisma.system_config.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return systemConfig;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
