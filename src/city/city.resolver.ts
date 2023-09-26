import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CityService } from './city.service';
import { City } from './entities/city.entity';
import { CreateCityInput, FilterCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => City)
export class CityResolver {
  constructor(
    private readonly cityService: CityService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => City)
  async createCity(@Args('createCityInput') createCityInput: CreateCityInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cityService.create(createCityInput, prisma);
      },
    );
  }

  @Query(() => [City])
  cities(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterCityInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cityService.findAll(prisma, page, pageSize, filter, search);
      },
    );
  }

  @Query(() => City, { name: 'city' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cityService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => City)
  async updateCity(@Args('updateCityInput') updateCityInput: UpdateCityInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cityService.update(
          updateCityInput.id,
          updateCityInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => City)
  async removeCity(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cityService.remove(id, prisma);
      },
    );
  }
}
