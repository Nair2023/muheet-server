import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import { CreateTagInput, FilterTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Tag)
export class TagResolver {
  constructor(
    private readonly tagService: TagService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Tag)
  async createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagService.create(createTagInput, prisma);
      },
    );
  }

  @Query(() => [Tag])
  tags(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterTagInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagService.findAll(prisma, page, pageSize, filter, search);
      },
    );
  }

  @Query(() => Tag, { name: 'tag' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Tag)
  async updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagService.update(
          updateTagInput.id,
          updateTagInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Tag)
  async removeTag(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagService.remove(id, prisma);
      },
    );
  }
}
