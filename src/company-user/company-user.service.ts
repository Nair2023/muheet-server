import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCompanyUserInput } from './dto/create-company-user.input';
import { UpdateCompanyUserInput } from './dto/update-company-user.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompanyUserService {
  private logger;
  constructor() {
    this.logger = new Logger('CompanyUser Service');
  }

  async create(
    createCompanyUserInput: CreateCompanyUserInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const companyUser = await prisma.company_user.create({
        data: {
          ...createCompanyUserInput,
        },
      });

      return companyUser;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.company_userWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.company_userWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const companyUser = await prisma.company_user.findMany({
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

      return companyUser;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const companyUser = await prisma.company_user.findFirst({
        where: {
          id,
        },
      });

      return companyUser;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateCompanyUserInput: UpdateCompanyUserInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const companyUser = await prisma.company_user.update({
        where: {
          id,
        },
        data: {
          ...updateCompanyUserInput,
        },
      });

      return companyUser;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const companyUser = await prisma.company_user.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return companyUser;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
