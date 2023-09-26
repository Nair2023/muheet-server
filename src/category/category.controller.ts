import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { filterConverter } from '../utils/helpers/parser.helper';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - Category Controller',
    description: 'create Category',
  })
  @ApiCreatedResponse({ type: Category })
  async create(@Body() createCategoryInput: CreateCategoryInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryService.create(createCategoryInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - Category Controller',
    description: 'update Category',
  })
  @ApiCreatedResponse({ type: Category })
  async update(
    @Param('id') id: number,
    @Body() updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryService.update(+id, updateCategoryInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/delete/:id')
  @ApiOperation({
    summary: 'Delete - Category Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: Category })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - Category Controller',
    description: 'find Category by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - Category Controller',
    description: 'Find all category or find Category by filter and search',
  })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'pageSize', type: Number })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: '{"field":"value"}',
  })
  @ApiQuery({ name: 'filter', type: 'object', required: false })
  @ApiCreatedResponse({ type: [Category] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.categoryWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const category = await this.categoryService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${category.length}`);

          return category;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
