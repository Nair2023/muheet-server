import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  private logger;
  constructor() {
    this.logger = new Logger('User Service');
  }

  async create(
    createUserInput: CreateUserInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const user = await prisma.user.create({
        data: {
          ...createUserInput,
        },
      });

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.userWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.userWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const user = await prisma.user.findMany({
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

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateUserInput: UpdateUserInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          ...updateUserInput,
        },
      });

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
