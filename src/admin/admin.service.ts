import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  private logger;
  constructor() {
    this.logger = new Logger('Admin Service');
  }

  async create(
    createAdminInput: CreateAdminInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const admin = await prisma.admin.create({
        data: {
          ...createAdminInput,
        },
      });

      return admin;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.adminWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.adminWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const admin = await prisma.admin.findMany({
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

      return admin;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const admin = await prisma.admin.findFirst({
        where: {
          id,
        },
      });

      return admin;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateAdminInput: UpdateAdminInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const admin = await prisma.admin.update({
        where: {
          id,
        },
        data: {
          ...updateAdminInput,
        },
      });

      return admin;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const admin = await prisma.admin.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return admin;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
