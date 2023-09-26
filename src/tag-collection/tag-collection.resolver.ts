import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TagCollectionService } from './tag-collection.service';
import { TagCollection } from './entities/tag-collection.entity';
import {
  CreateTagCollectionInput,
  FilterTagCollectionInput,
} from './dto/create-tag-collection.input';
import { UpdateTagCollectionInput } from './dto/update-tag-collection.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => TagCollection)
export class TagCollectionResolver {
  constructor(
    private readonly tagCollectionService: TagCollectionService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => TagCollection)
  async createTagCollection(
    @Args('createTagCollectionInput')
    createTagCollectionInput: CreateTagCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagCollectionService.create(
          createTagCollectionInput,
          prisma,
        );
      },
    );
  }

  @Query(() => [TagCollection])
  tagCollections(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterTagCollectionInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagCollectionService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => TagCollection, { name: 'tagCollection' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagCollectionService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => TagCollection)
  async updateTagCollection(
    @Args('updateTagCollectionInput')
    updateTagCollectionInput: UpdateTagCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagCollectionService.update(
          updateTagCollectionInput.id,
          updateTagCollectionInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => TagCollection)
  async removeTagCollection(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagCollectionService.remove(id, prisma);
      },
    );
  }
}
