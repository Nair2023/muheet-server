import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCountryInput } from './dto/create-country.input';
import { UpdateCountryInput } from './dto/update-country.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CountryService {
  private logger;
  constructor() {
    this.logger = new Logger('Country Service');
  }

  async create(
    createCountryInput: CreateCountryInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const country = await prisma.country.create({
        data: {
          ...createCountryInput,
        },
      });

      return country;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.countryWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.countryWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const country = await prisma.country.findMany({
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

      return country;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const countrys = await prisma.country.findFirst({
        where: {
          id,
        },
      });

      return countrys;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateCountryInput: UpdateCountryInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const country = await prisma.country.update({
        where: {
          id,
        },
        data: {
          ...updateCountryInput,
        },
      });

      return country;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const country = await prisma.country.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return country;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
