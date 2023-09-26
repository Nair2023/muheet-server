import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryLabelService } from './category-label.service';
import { CategoryLabel } from './entities/category-label.entity';
import {
  CreateCategoryLabelInput,
  FilterCategoryLabelInput,
} from './dto/create-category-label.input';
import { UpdateCategoryLabelInput } from './dto/update-category-label.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => CategoryLabel)
export class CategoryLabelResolver {
  constructor(
    private readonly categoryLabelService: CategoryLabelService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => CategoryLabel)
  async createCategoryLabel(
    @Args('createCategoryLabelInput')
    createCategoryLabelInput: CreateCategoryLabelInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryLabelService.create(
          createCategoryLabelInput,
          prisma,
        );
      },
    );
  }

  @Query(() => [CategoryLabel])
  categoryLabels(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterCategoryLabelInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryLabelService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => CategoryLabel, { name: 'categoryLabel' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryLabelService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => CategoryLabel)
  async updateCategoryLabel(
    @Args('updateCategoryLabelInput')
    updateCategoryLabelInput: UpdateCategoryLabelInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryLabelService.update(
          updateCategoryLabelInput.id,
          updateCategoryLabelInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => CategoryLabel)
  async removeCategoryLabel(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryLabelService.remove(id, prisma);
      },
    );
  }
}
