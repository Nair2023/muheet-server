import { SystemConfigService } from './system-config.service';
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
import { CreateSystemConfigInput } from './dto/create-system-config.input';
import { UpdateSystemConfigInput } from './dto/update-system-config.input';
import { SystemConfig } from './entities/system-config.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('System config')
@Controller('system-config')
export class SystemConfigController {
  constructor(
    private readonly systemConfigService: SystemConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - SystemConfig Controller',
    description: 'create System config',
  })
  @ApiCreatedResponse({ type: SystemConfig })
  async create(@Body() createSystemConfigInput: CreateSystemConfigInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigService.create(createSystemConfigInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - SystemConfig Controller',
    description: 'update System config',
  })
  @ApiCreatedResponse({ type: SystemConfig })
  async update(
    @Param('id') id: number,
    @Body() updateSystemConfigInput: UpdateSystemConfigInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigService.update(
          +id,
          updateSystemConfigInput,
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
    summary: 'Delete - SystemConfig Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: SystemConfig })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - SystemConfig Controller',
    description: 'find System config by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - SystemConfig Controller',
    description:
      'Find all system config or find System config by filter and search',
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
  @ApiCreatedResponse({ type: [SystemConfig] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.system_configWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const systemConfig = await this.systemConfigService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${systemConfig.length}`);

          return systemConfig;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
