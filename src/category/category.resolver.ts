import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import {
  CreateCategoryInput,
  FilterCategoryInput,
} from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryService.create(createCategoryInput, prisma);
      },
    );
  }

  @Query(() => [Category])
  categorys(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterCategoryInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Category, { name: 'category' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryService.update(
          updateCategoryInput.id,
          updateCategoryInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Category)
  async removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryService.remove(id, prisma);
      },
    );
  }
}
