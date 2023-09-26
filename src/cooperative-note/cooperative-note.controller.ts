import { CooperativeNoteService } from './cooperative-note.service';
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
import { CreateCooperativeNoteInput } from './dto/create-cooperative-note.input';
import { UpdateCooperativeNoteInput } from './dto/update-cooperative-note.input';
import { CooperativeNote } from './entities/cooperative-note.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Cooperative note')
@Controller('cooperative-note')
export class CooperativeNoteController {
  constructor(
    private readonly cooperativeNoteService: CooperativeNoteService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - CooperativeNote Controller',
    description: 'create Cooperative note',
  })
  @ApiCreatedResponse({ type: CooperativeNote })
  async create(@Body() createCooperativeNoteInput: CreateCooperativeNoteInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeNoteService.create(
          createCooperativeNoteInput,
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
    summary: 'Update - CooperativeNote Controller',
    description: 'update Cooperative note',
  })
  @ApiCreatedResponse({ type: CooperativeNote })
  async update(
    @Param('id') id: number,
    @Body() updateCooperativeNoteInput: UpdateCooperativeNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeNoteService.update(
          +id,
          updateCooperativeNoteInput,
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
    summary: 'Delete - CooperativeNote Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: CooperativeNote })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeNoteService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - CooperativeNote Controller',
    description: 'find Cooperative note by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeNoteService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - CooperativeNote Controller',
    description:
      'Find all cooperative note or find Cooperative note by filter and search',
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
  @ApiCreatedResponse({ type: [CooperativeNote] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.cooperative_noteWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const cooperativeNote = await this.cooperativeNoteService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${cooperativeNote.length}`);

          return cooperativeNote;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
