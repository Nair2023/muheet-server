import { CompanyClientService } from './company-client.service';
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
import { CreateCompanyClientInput } from './dto/create-company-client.input';
import { UpdateCompanyClientInput } from './dto/update-company-client.input';
import { CompanyClient } from './entities/company-client.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Company client')
@Controller('company-client')
export class CompanyClientController {
  constructor(
    private readonly companyClientService: CompanyClientService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - CompanyClient Controller',
    description: 'create Company client',
  })
  @ApiCreatedResponse({ type: CompanyClient })
  async create(@Body() createCompanyClientInput: CreateCompanyClientInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyClientService.create(
          createCompanyClientInput,
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
    summary: 'Update - CompanyClient Controller',
    description: 'update Company client',
  })
  @ApiCreatedResponse({ type: CompanyClient })
  async update(
    @Param('id') id: number,
    @Body() updateCompanyClientInput: UpdateCompanyClientInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyClientService.update(
          +id,
          updateCompanyClientInput,
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
    summary: 'Delete - CompanyClient Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: CompanyClient })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyClientService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - CompanyClient Controller',
    description: 'find Company client by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyClientService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - CompanyClient Controller',
    description:
      'Find all company client or find Company client by filter and search',
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
  @ApiCreatedResponse({ type: [CompanyClient] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.company_clientWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const companyClient = await this.companyClientService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${companyClient.length}`);

          return companyClient;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
