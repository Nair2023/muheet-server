import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  private logger;
  constructor() {
    this.logger = new Logger('Client Service');
  }

  async create(
    createClientInput: CreateClientInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const client = await prisma.client.create({
        data: {
          ...createClientInput,
        },
      });

      return client;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.clientWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.clientWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const client = await prisma.client.findMany({
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

      return client;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const client = await prisma.client.findFirst({
        where: {
          id,
        },
      });

      return client;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateClientInput: UpdateClientInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const client = await prisma.client.update({
        where: {
          id,
        },
        data: {
          ...updateClientInput,
        },
      });

      return client;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const client = await prisma.client.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return client;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
