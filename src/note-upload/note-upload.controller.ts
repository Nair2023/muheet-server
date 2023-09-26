import { NoteUploadService } from './note-upload.service';
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
import { CreateNoteUploadInput } from './dto/create-note-upload.input';
import { UpdateNoteUploadInput } from './dto/update-note-upload.input';
import { NoteUpload } from './entities/note-upload.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Note upload')
@Controller('note-upload')
export class NoteUploadController {
  constructor(
    private readonly noteUploadService: NoteUploadService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - NoteUpload Controller',
    description: 'create Note upload',
  })
  @ApiCreatedResponse({ type: NoteUpload })
  async create(@Body() createNoteUploadInput: CreateNoteUploadInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteUploadService.create(createNoteUploadInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - NoteUpload Controller',
    description: 'update Note upload',
  })
  @ApiCreatedResponse({ type: NoteUpload })
  async update(
    @Param('id') id: number,
    @Body() updateNoteUploadInput: UpdateNoteUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteUploadService.update(
          +id,
          updateNoteUploadInput,
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
    summary: 'Delete - NoteUpload Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: NoteUpload })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteUploadService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - NoteUpload Controller',
    description: 'find Note upload by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteUploadService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - NoteUpload Controller',
    description:
      'Find all note upload or find Note upload by filter and search',
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
  @ApiCreatedResponse({ type: [NoteUpload] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.note_uploadWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const noteUpload = await this.noteUploadService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${noteUpload.length}`);

          return noteUpload;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
