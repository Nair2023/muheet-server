import { MeetingInviteeService } from './meeting-invitee.service';
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
import { CreateMeetingInviteeInput } from './dto/create-meeting-invitee.input';
import { UpdateMeetingInviteeInput } from './dto/update-meeting-invitee.input';
import { MeetingInvitee } from './entities/meeting-invitee.entity';
import { ApiHeaders } from 'src/utils/decorators/headers.decorator';
import { PrismaService } from 'src/prisma.service';

@ApiHeaders({ withAuth: false })
@ApiTags('Meeting invitee')
@Controller('meeting-invitee')
export class MeetingInviteeController {
  constructor(
    private readonly meetingInviteeService: MeetingInviteeService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create - MeetingInvitee Controller',
    description: 'create Meeting invitee',
  })
  @ApiCreatedResponse({ type: MeetingInvitee })
  async create(@Body() createMeetingInviteeInput: CreateMeetingInviteeInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingInviteeService.create(
          createMeetingInviteeInput,
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
    summary: 'Update - MeetingInvitee Controller',
    description: 'update Meeting invitee',
  })
  @ApiCreatedResponse({ type: MeetingInvitee })
  async update(
    @Param('id') id: number,
    @Body() updateMeetingInviteeInput: UpdateMeetingInviteeInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingInviteeService.update(
          +id,
          updateMeetingInviteeInput,
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
    summary: 'Delete - MeetingInvitee Controller',
    description: 'update is_deleted to true ',
  })
  @ApiCreatedResponse({ type: MeetingInvitee })
  async delete(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingInviteeService.remove(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get By Id - MeetingInvitee Controller',
    description: 'find Meeting invitee by id',
  })
  async findOne(@Param('id') id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingInviteeService.findOne(+id, prisma);
      },
      {
        maxWait: 3000,
        timeout: 3000,
      },
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get Multiple Countries - MeetingInvitee Controller',
    description:
      'Find all meeting invitee or find Meeting invitee by filter and search',
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
  @ApiCreatedResponse({ type: [MeetingInvitee] })
  async findAll(
    @Res() res: Response,
    @Query()
    {
      page,
      pageSize,
      search,
      ...filter
    }: Prisma.meeting_inviteeWhereInput & {
      page: number;
      pageSize: number;
      search: string;
    },
  ) {
    if (filter) filter = filterConverter(filter);

    return res.send(
      await this.prismaService.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const meetingInvitee = await this.meetingInviteeService.findAll(
            prisma,
            page,
            pageSize,
            filter,
            search,
          );

          res.set('x-total-count', `${meetingInvitee.length}`);

          return meetingInvitee;
        },
        {
          maxWait: 3000,
          timeout: 3000,
        },
      ),
    );
  }
}
