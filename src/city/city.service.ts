import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CityService {
  private logger;
  constructor() {
    this.logger = new Logger('City Service');
  }

  async create(
    createCityInput: CreateCityInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const city = await prisma.city.create({
        data: {
          ...createCityInput,
        },
      });

      return city;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(
    prisma: Prisma.TransactionClient,
    page: number,
    pageSize: number,
    filter?: Prisma.cityWhereInput,
    search?: string,
  ) {
    try {
      const where: Prisma.cityWhereInput = { ...filter };

      if (search) {
        search = JSON.parse(search);

        Object.keys(search).forEach((key) => {
          where[key] = { contains: search[key], mode: 'insensitive' };
        });
      }

      const city = await prisma.city.findMany({
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

      return city;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, prisma: Prisma.TransactionClient) {
    try {
      const cities = await prisma.city.findFirst({
        where: {
          id,
        },
      });

      return cities;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: number,
    updateCityInput: UpdateCityInput,
    prisma: Prisma.TransactionClient,
  ) {
    try {
      const city = await prisma.city.update({
        where: {
          id,
        },
        data: {
          ...updateCityInput,
        },
      });

      return city;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async remove(id: number, prisma: Prisma.TransactionClient) {
    try {
      const city = await prisma.city.update({
        where: {
          id,
        },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return city;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
