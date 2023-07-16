import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';
import {
  CreateCountryInput,
  FilterCountryInput,
} from './dto/create-country.input';
import { UpdateCountryInput } from './dto/update-country.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Country)
export class CountryResolver {
  constructor(
    private readonly noteService: CountryService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Country)
  async createCountry(
    @Args('createCountryInput') createCountryInput: CreateCountryInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteService.create(createCountryInput, prisma);
      },
    );
  }

  @Query(() => [Country])
  notes(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterCountryInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteService.findAll(prisma, page, pageSize, filter, search);
      },
    );
  }

  @Query(() => Country, { name: 'note' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Country)
  async updateCountry(
    @Args('updateCountryInput') updateCountryInput: UpdateCountryInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteService.update(
          updateCountryInput.id,
          updateCountryInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Country)
  async removeCountry(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteService.remove(id, prisma);
      },
    );
  }
}
