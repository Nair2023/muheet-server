import { SharedNoteService } from './shared-note.service';
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
import { CreateSharedNoteInput } from './dto/create-shared-note.input';
import { UpdateSharedNoteInput } from './dto/update-shared-note.input';
import { SharedNote } from './entities/shared-note.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Shared note')
@Controller('shared-note')
export class SharedNoteController {
  constructor(
    private readonly sharedNoteService: SharedNoteService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - SharedNote Controller',
    description: 'create Shared note',
  })
  @ApiCreatedResponse({ type: SharedNote })
  async create(@Body() createSharedNoteInput: CreateSharedNoteInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedNoteService.create(createSharedNoteInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - SharedNote Controller',
    description: 'update Shared note',
  })
  @ApiCreatedResponse({ type: SharedNote })
  async update(
    @Param('id') id: number,
    @Body() updateSharedNoteInput: UpdateSharedNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedNoteService.update(
          +id,
          updateSharedNoteInput,
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
    summary: 'Delete - SharedNote Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: SharedNote })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedNoteService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - SharedNote Controller',
    description: 'find Shared note by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedNoteService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - SharedNote Controller',
    description:
      'Find all shared note or find Shared note by filter and search',
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
  @ApiCreatedResponse({ type: [SharedNote] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.shared_noteWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const sharedNote = await this.sharedNoteService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${sharedNote.length}`);

          return sharedNote;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
