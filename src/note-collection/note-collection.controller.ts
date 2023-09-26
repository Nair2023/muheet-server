import { NoteCollectionService } from './note-collection.service';
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
import { CreateNoteCollectionInput } from './dto/create-note-collection.input';
import { UpdateNoteCollectionInput } from './dto/update-note-collection.input';
import { NoteCollection } from './entities/note-collection.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Note collection')
@Controller('note-collection')
export class NoteCollectionController {
  constructor(
    private readonly noteCollectionService: NoteCollectionService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - NoteCollection Controller',
    description: 'create Note collection',
  })
  @ApiCreatedResponse({ type: NoteCollection })
  async create(@Body() createNoteCollectionInput: CreateNoteCollectionInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteCollectionService.create(
          createNoteCollectionInput,
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
    summary: 'Update - NoteCollection Controller',
    description: 'update Note collection',
  })
  @ApiCreatedResponse({ type: NoteCollection })
  async update(
    @Param('id') id: number,
    @Body() updateNoteCollectionInput: UpdateNoteCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteCollectionService.update(
          +id,
          updateNoteCollectionInput,
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
    summary: 'Delete - NoteCollection Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: NoteCollection })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteCollectionService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - NoteCollection Controller',
    description: 'find Note collection by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteCollectionService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - NoteCollection Controller',
    description:
      'Find all note collection or find Note collection by filter and search',
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
  @ApiCreatedResponse({ type: [NoteCollection] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.note_collectionWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const noteCollection = await this.noteCollectionService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${noteCollection.length}`);

          return noteCollection;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
