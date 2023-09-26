import { CooperativeCollectionService } from './cooperative-collection.service';
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
import { CreateCooperativeCollectionInput } from './dto/create-cooperative-collection.input';
import { UpdateCooperativeCollectionInput } from './dto/update-cooperative-collection.input';
import { CooperativeCollection } from './entities/cooperative-collection.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Cooperative collection')
@Controller('cooperative-collection')
export class CooperativeCollectionController {
  constructor(
    private readonly cooperativeCollectionService: CooperativeCollectionService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - CooperativeCollection Controller',
    description: 'create Cooperative collection',
  })
  @ApiCreatedResponse({ type: CooperativeCollection })
  async create(
    @Body() createCooperativeCollectionInput: CreateCooperativeCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeCollectionService.create(
          createCooperativeCollectionInput,
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
    summary: 'Update - CooperativeCollection Controller',
    description: 'update Cooperative collection',
  })
  @ApiCreatedResponse({ type: CooperativeCollection })
  async update(
    @Param('id') id: number,
    @Body() updateCooperativeCollectionInput: UpdateCooperativeCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeCollectionService.update(
          +id,
          updateCooperativeCollectionInput,
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
    summary: 'Delete - CooperativeCollection Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: CooperativeCollection })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeCollectionService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - CooperativeCollection Controller',
    description: 'find Cooperative collection by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeCollectionService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - CooperativeCollection Controller',
    description:
      'Find all cooperative collection or find Cooperative collection by filter and search',
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
  @ApiCreatedResponse({ type: [CooperativeCollection] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.cooperative_collectionWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const cooperativeCollection =
            await this.cooperativeCollectionService.findAll(
              prisma,
              page,
              pageSize,
              filter,
              search,
            );

          res.set('x-total-count', `${cooperativeCollection.length}`);

          return cooperativeCollection;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
