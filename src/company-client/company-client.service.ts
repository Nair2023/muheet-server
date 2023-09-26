import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCompanyClientInput } from './dto/create-company-client.input';
import { UpdateCompanyClientInput } from './dto/update-company-client.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompanyClientService {
  private logger;
  constructor() {
    this.logger = new Logger('CompanyClient Service');
  }

  async create(
    createCompanyClientInput: CreateCompanyClientInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const companyClient = await prisma.company_client.create({
        data: {
          ...createCompanyClientInput,
        },
      });

      return companyClient;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.company_clientWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.company_clientWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const companyClient = await prisma.company_client.findMany({
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

      return companyClient;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const companyClient = await prisma.company_client.findFirst({
        where: {
          id,
        },
      });

      return companyClient;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateCompanyClientInput: UpdateCompanyClientInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const companyClient = await prisma.company_client.update({
        where: {
          id,
        },
        data: {
          ...updateCompanyClientInput,
        },
      });

      return companyClient;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const companyClient = await prisma.company_client.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return companyClient;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
