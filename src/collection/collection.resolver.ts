import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CollectionService } from './collection.service';
import { Collection } from './entities/collection.entity';
import {
  CreateCollectionInput,
  FilterCollectionInput,
} from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(
    private readonly collectionService: CollectionService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Collection)
  async createCollection(
    @Args('createCollectionInput') createCollectionInput: CreateCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.collectionService.create(createCollectionInput, prisma);
      },
    );
  }

  @Query(() => [Collection])
  collections(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterCollectionInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.collectionService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Collection, { name: 'collection' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.collectionService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Collection)
  async updateCollection(
    @Args('updateCollectionInput') updateCollectionInput: UpdateCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.collectionService.update(
          updateCollectionInput.id,
          updateCollectionInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Collection)
  async removeCollection(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.collectionService.remove(id, prisma);
      },
    );
  }
}
