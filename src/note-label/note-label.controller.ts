import { NoteLabelService } from './note-label.service';
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
import { CreateNoteLabelInput } from './dto/create-note-label.input';
import { UpdateNoteLabelInput } from './dto/update-note-label.input';
import { NoteLabel } from './entities/note-label.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Note label')
@Controller('note-label')
export class NoteLabelController {
  constructor(
    private readonly noteLabelService: NoteLabelService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - NoteLabel Controller',
    description: 'create Note label',
  })
  @ApiCreatedResponse({ type: NoteLabel })
  async create(@Body() createNoteLabelInput: CreateNoteLabelInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteLabelService.create(createNoteLabelInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - NoteLabel Controller',
    description: 'update Note label',
  })
  @ApiCreatedResponse({ type: NoteLabel })
  async update(
    @Param('id') id: number,
    @Body() updateNoteLabelInput: UpdateNoteLabelInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteLabelService.update(+id, updateNoteLabelInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/delete/:id')
  @ApiOperation({
    summary: 'Delete - NoteLabel Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: NoteLabel })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteLabelService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - NoteLabel Controller',
    description: 'find Note label by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteLabelService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - NoteLabel Controller',
    description: 'Find all note label or find Note label by filter and search',
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
  @ApiCreatedResponse({ type: [NoteLabel] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.note_labelWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const noteLabel = await this.noteLabelService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${noteLabel.length}`);

          return noteLabel;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
