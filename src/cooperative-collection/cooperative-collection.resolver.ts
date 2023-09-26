import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CooperativeCollectionService } from './cooperative-collection.service';
import { CooperativeCollection } from './entities/cooperative-collection.entity';
import {
  CreateCooperativeCollectionInput,
  FilterCooperativeCollectionInput,
} from './dto/create-cooperative-collection.input';
import { UpdateCooperativeCollectionInput } from './dto/update-cooperative-collection.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => CooperativeCollection)
export class CooperativeCollectionResolver {
  constructor(
    private readonly cooperativeCollectionService: CooperativeCollectionService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => CooperativeCollection)
  async createCooperativeCollection(
    @Args('createCooperativeCollectionInput')
    createCooperativeCollectionInput: CreateCooperativeCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeCollectionService.create(
          createCooperativeCollectionInput,
          prisma,
        );
      },
    );
  }

  @Query(() => [CooperativeCollection])
  cooperativeCollections(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true })
    filter?: FilterCooperativeCollectionInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeCollectionService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => CooperativeCollection, { name: 'cooperativeCollection' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeCollectionService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => CooperativeCollection)
  async updateCooperativeCollection(
    @Args('updateCooperativeCollectionInput')
    updateCooperativeCollectionInput: UpdateCooperativeCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeCollectionService.update(
          updateCooperativeCollectionInput.id,
          updateCooperativeCollectionInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => CooperativeCollection)
  async removeCooperativeCollection(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeCollectionService.remove(id, prisma);
      },
    );
  }
}
