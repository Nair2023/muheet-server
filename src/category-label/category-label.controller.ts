import { CategoryLabelService } from './category-label.service';
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
import { CreateCategoryLabelInput } from './dto/create-category-label.input';
import { UpdateCategoryLabelInput } from './dto/update-category-label.input';
import { CategoryLabel } from './entities/category-label.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Category label')
@Controller('category-label')
export class CategoryLabelController {
  constructor(
    private readonly categoryLabelService: CategoryLabelService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - CategoryLabel Controller',
    description: 'create Category label',
  })
  @ApiCreatedResponse({ type: CategoryLabel })
  async create(@Body() createCategoryLabelInput: CreateCategoryLabelInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryLabelService.create(
          createCategoryLabelInput,
          prisma,
        );
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - CategoryLabel Controller',
    description: 'update Category label',
  })
  @ApiCreatedResponse({ type: CategoryLabel })
  async update(
    @Param('id') id: number,
    @Body() updateCategoryLabelInput: UpdateCategoryLabelInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryLabelService.update(
          +id,
          updateCategoryLabelInput,
          prisma,
        );
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/delete/:id')
  @ApiOperation({
    summary: 'Delete - CategoryLabel Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: CategoryLabel })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryLabelService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - CategoryLabel Controller',
    description: 'find Category label by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryLabelService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - CategoryLabel Controller',
    description:
      'Find all category label or find Category label by filter and search',
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
  @ApiCreatedResponse({ type: [CategoryLabel] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.category_labelWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const categoryLabel = await this.categoryLabelService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${categoryLabel.length}`);

          return categoryLabel;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
