import { TrashUploadService } from './trash-upload.service';
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
import { CreateTrashUploadInput } from './dto/create-trash-upload.input';
import { UpdateTrashUploadInput } from './dto/update-trash-upload.input';
import { TrashUpload } from './entities/trash-upload.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Trash upload')
@Controller('trash-upload')
export class TrashUploadController {
  constructor(
    private readonly trashUploadService: TrashUploadService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - TrashUpload Controller',
    description: 'create Trash upload',
  })
  @ApiCreatedResponse({ type: TrashUpload })
  async create(@Body() createTrashUploadInput: CreateTrashUploadInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashUploadService.create(createTrashUploadInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - TrashUpload Controller',
    description: 'update Trash upload',
  })
  @ApiCreatedResponse({ type: TrashUpload })
  async update(
    @Param('id') id: number,
    @Body() updateTrashUploadInput: UpdateTrashUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashUploadService.update(
          +id,
          updateTrashUploadInput,
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
    summary: 'Delete - TrashUpload Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: TrashUpload })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashUploadService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - TrashUpload Controller',
    description: 'find Trash upload by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashUploadService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - TrashUpload Controller',
    description:
      'Find all trash upload or find Trash upload by filter and search',
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
  @ApiCreatedResponse({ type: [TrashUpload] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.trash_uploadWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const trashUpload = await this.trashUploadService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${trashUpload.length}`);

          return trashUpload;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
