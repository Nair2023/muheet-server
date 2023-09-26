import { DeadlineFighterService } from './deadline-fighter.service';
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
import { CreateDeadlineFighterInput } from './dto/create-deadline-fighter.input';
import { UpdateDeadlineFighterInput } from './dto/update-deadline-fighter.input';
import { DeadlineFighter } from './entities/deadline-fighter.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Deadline fighter')
@Controller('deadline-fighter')
export class DeadlineFighterController {
  constructor(
    private readonly deadlineFighterService: DeadlineFighterService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - DeadlineFighter Controller',
    description: 'create Deadline fighter',
  })
  @ApiCreatedResponse({ type: DeadlineFighter })
  async create(@Body() createDeadlineFighterInput: CreateDeadlineFighterInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineFighterService.create(
          createDeadlineFighterInput,
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
    summary: 'Update - DeadlineFighter Controller',
    description: 'update Deadline fighter',
  })
  @ApiCreatedResponse({ type: DeadlineFighter })
  async update(
    @Param('id') id: number,
    @Body() updateDeadlineFighterInput: UpdateDeadlineFighterInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineFighterService.update(
          +id,
          updateDeadlineFighterInput,
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
    summary: 'Delete - DeadlineFighter Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: DeadlineFighter })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineFighterService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - DeadlineFighter Controller',
    description: 'find Deadline fighter by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineFighterService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - DeadlineFighter Controller',
    description:
      'Find all deadline fighter or find Deadline fighter by filter and search',
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
  @ApiCreatedResponse({ type: [DeadlineFighter] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.deadline_fighterWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const deadlineFighter = await this.deadlineFighterService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${deadlineFighter.length}`);

          return deadlineFighter;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
