import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class SettingService {
  private logger;
  constructor() {
    this.logger = new Logger('Setting Service');
  }

  async create(
    createSettingInput: CreateSettingInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const setting = await prisma.setting.create({
        data: {
          ...createSettingInput,
        },
      });

      return setting;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.settingWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.settingWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const setting = await prisma.setting.findMany({
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

      return setting;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const settings = await prisma.setting.findFirst({
        where: {
          id,
        },
      });

      return settings;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateSettingInput: UpdateSettingInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const setting = await prisma.setting.update({
        where: {
          id,
        },
        data: {
          ...updateSettingInput,
        },
      });

      return setting;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
