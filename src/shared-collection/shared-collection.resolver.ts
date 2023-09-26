import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SharedCollectionService } from './shared-collection.service';
import { SharedCollection } from './entities/shared-collection.entity';
import {
  CreateSharedCollectionInput,
  FilterSharedCollectionInput,
} from './dto/create-shared-collection.input';
import { UpdateSharedCollectionInput } from './dto/update-shared-collection.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => SharedCollection)
export class SharedCollectionResolver {
  constructor(
    private readonly sharedCollectionService: SharedCollectionService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => SharedCollection)
  async createSharedCollection(
    @Args('createSharedCollectionInput')
    createSharedCollectionInput: CreateSharedCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedCollectionService.create(
          createSharedCollectionInput,
          prisma,
        );
      },
    );
  }

  @Query(() => [SharedCollection])
  sharedCollections(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterSharedCollectionInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedCollectionService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => SharedCollection, { name: 'sharedCollection' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedCollectionService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => SharedCollection)
  async updateSharedCollection(
    @Args('updateSharedCollectionInput')
    updateSharedCollectionInput: UpdateSharedCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedCollectionService.update(
          updateSharedCollectionInput.id,
          updateSharedCollectionInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => SharedCollection)
  async removeSharedCollection(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedCollectionService.remove(id, prisma);
      },
    );
  }
}
