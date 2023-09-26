import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateArchiveInput } from './dto/create-archive.input';
import { UpdateArchiveInput } from './dto/update-archive.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArchiveService {
  private logger;
  constructor() {
    this.logger = new Logger('Archive Service');
  }

  async create(
    createArchiveInput: CreateArchiveInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const archive = await prisma.archive.create({
        data: {
          ...createArchiveInput,
        },
      });

      return archive;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.archiveWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.archiveWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const archive = await prisma.archive.findMany({
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

      return archive;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const archive = await prisma.archive.findFirst({
        where: {
          id,
        },
      });

      return archive;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateArchiveInput: UpdateArchiveInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const archive = await prisma.archive.update({
        where: {
          id,
        },
        data: {
          ...updateArchiveInput,
        },
      });

      return archive;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      await prisma.archive.delete({
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
