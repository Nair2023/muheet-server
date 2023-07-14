import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompanyService {
  private logger;

  constructor() {
    this.logger = new Logger('Company Service');
  }
  async create(
    createCompanyInput: CreateCompanyInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const company = await prisma.company.create({
        data: {
          ...createCompanyInput,
        },
        include: {
          creator: true,
        },
      });

      return company;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.accountWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.accountWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const company = await prisma.company.findMany({
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

      return company;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const company = await prisma.company.findUnique({
        where: {
          id,
        },
      });

      return company;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateCompanyInput: UpdateCompanyInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const company = await prisma.company.update({
        where: {
          id,
        },
        data: {
          ...updateCompanyInput,
        },
      });

      return company;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const company = await prisma.company.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return company;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
