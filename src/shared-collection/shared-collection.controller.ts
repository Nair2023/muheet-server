import { SharedCollectionService } from './shared-collection.service';
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
import { CreateSharedCollectionInput } from './dto/create-shared-collection.input';
import { UpdateSharedCollectionInput } from './dto/update-shared-collection.input';
import { SharedCollection } from './entities/shared-collection.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Shared collection')
@Controller('shared-collection')
export class SharedCollectionController {
  constructor(
    private readonly sharedCollectionService: SharedCollectionService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - SharedCollection Controller',
    description: 'create Shared collection',
  })
  @ApiCreatedResponse({ type: SharedCollection })
  async create(
    @Body() createSharedCollectionInput: CreateSharedCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedCollectionService.create(
          createSharedCollectionInput,
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
    summary: 'Update - SharedCollection Controller',
    description: 'update Shared collection',
  })
  @ApiCreatedResponse({ type: SharedCollection })
  async update(
    @Param('id') id: number,
    @Body() updateSharedCollectionInput: UpdateSharedCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedCollectionService.update(
          +id,
          updateSharedCollectionInput,
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
    summary: 'Delete - SharedCollection Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: SharedCollection })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedCollectionService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - SharedCollection Controller',
    description: 'find Shared collection by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedCollectionService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - SharedCollection Controller',
    description:
      'Find all shared collection or find Shared collection by filter and search',
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
  @ApiCreatedResponse({ type: [SharedCollection] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.shared_collectionWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const sharedCollection = await this.sharedCollectionService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${sharedCollection.length}`);

          return sharedCollection;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
