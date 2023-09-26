import { CompanyUserService } from './company-user.service';
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
import { CreateCompanyUserInput } from './dto/create-company-user.input';
import { UpdateCompanyUserInput } from './dto/update-company-user.input';
import { CompanyUser } from './entities/company-user.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Company user')
@Controller('company-user')
export class CompanyUserController {
  constructor(
    private readonly companyUserService: CompanyUserService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - CompanyUser Controller',
    description: 'create Company user',
  })
  @ApiCreatedResponse({ type: CompanyUser })
  async create(@Body() createCompanyUserInput: CreateCompanyUserInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyUserService.create(createCompanyUserInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - CompanyUser Controller',
    description: 'update Company user',
  })
  @ApiCreatedResponse({ type: CompanyUser })
  async update(
    @Param('id') id: number,
    @Body() updateCompanyUserInput: UpdateCompanyUserInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyUserService.update(
          +id,
          updateCompanyUserInput,
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
    summary: 'Delete - CompanyUser Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: CompanyUser })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyUserService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - CompanyUser Controller',
    description: 'find Company user by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyUserService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - CompanyUser Controller',
    description:
      'Find all company user or find Company user by filter and search',
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
  @ApiCreatedResponse({ type: [CompanyUser] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.company_userWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const companyUser = await this.companyUserService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${companyUser.length}`);

          return companyUser;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
