import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeviceService {
  private logger;
  constructor() {
    this.logger = new Logger('Device Service');
  }

  async create(
    createDeviceInput: CreateDeviceInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const device = await prisma.device.create({
        data: {
          ...createDeviceInput,
        },
      });

      return device;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(prisma: Prisma.TransactionClient) {
    try {
      const device = await prisma.device.findMany({
        orderBy: {
          id: 'desc',
        },
      });

      return device;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const devices = await prisma.device.findFirst({
        where: {
          id,
        },
      });

      return devices;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateDeviceInput: UpdateDeviceInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const device = await prisma.device.update({
        where: {
          id,
        },
        data: {
          ...updateDeviceInput,
        },
      });

      return device;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const device = await prisma.device.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return device;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
