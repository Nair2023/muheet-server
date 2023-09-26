import { CategoryNoteService } from './category-note.service';
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
import { CreateCategoryNoteInput } from './dto/create-category-note.input';
import { UpdateCategoryNoteInput } from './dto/update-category-note.input';
import { CategoryNote } from './entities/category-note.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Category note')
@Controller('category-note')
export class CategoryNoteController {
  constructor(
    private readonly categoryNoteService: CategoryNoteService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - CategoryNote Controller',
    description: 'create Category note',
  })
  @ApiCreatedResponse({ type: CategoryNote })
  async create(@Body() createCategoryNoteInput: CreateCategoryNoteInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryNoteService.create(createCategoryNoteInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - CategoryNote Controller',
    description: 'update Category note',
  })
  @ApiCreatedResponse({ type: CategoryNote })
  async update(
    @Param('id') id: number,
    @Body() updateCategoryNoteInput: UpdateCategoryNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryNoteService.update(
          +id,
          updateCategoryNoteInput,
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
    summary: 'Delete - CategoryNote Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: CategoryNote })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryNoteService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - CategoryNote Controller',
    description: 'find Category note by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.categoryNoteService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - CategoryNote Controller',
    description:
      'Find all category note or find Category note by filter and search',
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
  @ApiCreatedResponse({ type: [CategoryNote] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.category_noteWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const categoryNote = await this.categoryNoteService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${categoryNote.length}`);

          return categoryNote;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
