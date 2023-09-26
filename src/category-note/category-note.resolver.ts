import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryNoteService } from './category-note.service';
import { CategoryNote } from './entities/category-note.entity';
import {
  CreateCategoryNoteInput,
  FilterCategoryNoteInput,
} from './dto/create-category-note.input';
import { UpdateCategoryNoteInput } from './dto/update-category-note.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => CategoryNote)
export class CategoryNoteResolver {
  constructor(
    private readonly categoryNoteService: CategoryNoteService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => CategoryNote)
  async createCategoryNote(
    @Args('createCategoryNoteInput')
    createCategoryNoteInput: CreateCategoryNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryNoteService.create(createCategoryNoteInput, prisma);
      },
    );
  }

  @Query(() => [CategoryNote])
  categoryNotes(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterCategoryNoteInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryNoteService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => CategoryNote, { name: 'categoryNote' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryNoteService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => CategoryNote)
  async updateCategoryNote(
    @Args('updateCategoryNoteInput')
    updateCategoryNoteInput: UpdateCategoryNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryNoteService.update(
          updateCategoryNoteInput.id,
          updateCategoryNoteInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => CategoryNote)
  async removeCategoryNote(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryNoteService.remove(id, prisma);
      },
    );
  }
}
