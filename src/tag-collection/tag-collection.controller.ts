import { TagCollectionService } from './tag-collection.service';
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
import { CreateTagCollectionInput } from './dto/create-tag-collection.input';
import { UpdateTagCollectionInput } from './dto/update-tag-collection.input';
import { TagCollection } from './entities/tag-collection.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Tag collection')
@Controller('tag-collection')
export class TagCollectionController {
  constructor(
    private readonly tagCollectionService: TagCollectionService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - TagCollection Controller',
    description: 'create Tag collection',
  })
  @ApiCreatedResponse({ type: TagCollection })
  async create(@Body() createTagCollectionInput: CreateTagCollectionInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagCollectionService.create(
          createTagCollectionInput,
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
    summary: 'Update - TagCollection Controller',
    description: 'update Tag collection',
  })
  @ApiCreatedResponse({ type: TagCollection })
  async update(
    @Param('id') id: number,
    @Body() updateTagCollectionInput: UpdateTagCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagCollectionService.update(
          +id,
          updateTagCollectionInput,
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
    summary: 'Delete - TagCollection Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: TagCollection })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagCollectionService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - TagCollection Controller',
    description: 'find Tag collection by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tagCollectionService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - TagCollection Controller',
    description:
      'Find all tag collection or find Tag collection by filter and search',
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
  @ApiCreatedResponse({ type: [TagCollection] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.tag_collectionWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const tagCollection = await this.tagCollectionService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${tagCollection.length}`);

          return tagCollection;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
