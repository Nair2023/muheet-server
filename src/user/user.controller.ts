import { UserService } from './user.service';
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
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - User Controller',
    description: 'create User',
  })
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserInput: CreateUserInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.userService.create(createUserInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update - User Controller',
    description: 'update User',
  })
  @ApiCreatedResponse({ type: User })
  async update(
    @Param('id') id: number,
    @Body() updateUserInput: UpdateUserInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.userService.update(+id, updateUserInput, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Patch('/delete/:id')
  @ApiOperation({
    summary: 'Delete - User Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: User })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.userService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - User Controller',
    description: 'find User by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.userService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - User Controller',
    description: 'Find all user or find User by filter and search',
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
  @ApiCreatedResponse({ type: [User] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.userWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const user = await this.userService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${user.length}`);

          return user;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
