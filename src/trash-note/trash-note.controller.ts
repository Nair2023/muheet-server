import { TrashNoteService } from './trash-note.service';
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
import { CreateTrashNoteInput } from './dto/create-trash-note.input';
import { UpdateTrashNoteInput } from './dto/update-trash-note.input';
import { TrashNote } from './entities/trash-note.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Trash note')
@Controller('trash-note')
export class TrashNoteController {
  constructor(
    private readonly trashNoteService: TrashNoteService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - TrashNote Controller',
    description: 'create Trash note',
  })
  @ApiCreatedResponse({ type: TrashNote })
  async create(@Body() createTrashNoteInput: CreateTrashNoteInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashNoteService.create(createTrashNoteInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - TrashNote Controller',
    description: 'update Trash note',
  })
  @ApiCreatedResponse({ type: TrashNote })
  async update(
    @Param('id') id: number,
    @Body() updateTrashNoteInput: UpdateTrashNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashNoteService.update(+id, updateTrashNoteInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/delete/:id')
  @ApiOperation({
    summary: 'Delete - TrashNote Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: TrashNote })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashNoteService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - TrashNote Controller',
    description: 'find Trash note by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashNoteService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - TrashNote Controller',
    description: 'Find all trash note or find Trash note by filter and search',
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
  @ApiCreatedResponse({ type: [TrashNote] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.trash_noteWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const trashNote = await this.trashNoteService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${trashNote.length}`);

          return trashNote;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
