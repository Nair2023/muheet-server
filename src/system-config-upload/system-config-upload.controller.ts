import { SystemConfigUploadService } from './system-config-upload.service';
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
import { CreateSystemConfigUploadInput } from './dto/create-system-config-upload.input';
import { UpdateSystemConfigUploadInput } from './dto/update-system-config-upload.input';
import { SystemConfigUpload } from './entities/system-config-upload.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('System config upload')
@Controller('system-config-upload')
export class SystemConfigUploadController {
  constructor(
    private readonly systemConfigUploadService: SystemConfigUploadService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - SystemConfigUpload Controller',
    description: 'create System config upload',
  })
  @ApiCreatedResponse({ type: SystemConfigUpload })
  async create(
    @Body() createSystemConfigUploadInput: CreateSystemConfigUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigUploadService.create(
          createSystemConfigUploadInput,
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
    summary: 'Update - SystemConfigUpload Controller',
    description: 'update System config upload',
  })
  @ApiCreatedResponse({ type: SystemConfigUpload })
  async update(
    @Param('id') id: number,
    @Body() updateSystemConfigUploadInput: UpdateSystemConfigUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigUploadService.update(
          +id,
          updateSystemConfigUploadInput,
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
    summary: 'Delete - SystemConfigUpload Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: SystemConfigUpload })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigUploadService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - SystemConfigUpload Controller',
    description: 'find System config upload by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigUploadService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - SystemConfigUpload Controller',
    description:
      'Find all system config upload or find System config upload by filter and search',
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
  @ApiCreatedResponse({ type: [SystemConfigUpload] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.system_config_uploadWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const systemConfigUpload =
            await this.systemConfigUploadService.findAll(
              prisma,
              page,
              pageSize,
              filter,
              search,
            );

          res.set('x-total-count', `${systemConfigUpload.length}`);

          return systemConfigUpload;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
