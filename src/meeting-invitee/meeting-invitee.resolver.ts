import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeetingInviteeService } from './meeting-invitee.service';
import { MeetingInvitee } from './entities/meeting-invitee.entity';
import {
  CreateMeetingInviteeInput,
  FilterMeetingInviteeInput,
} from './dto/create-meeting-invitee.input';
import { UpdateMeetingInviteeInput } from './dto/update-meeting-invitee.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => MeetingInvitee)
export class MeetingInviteeResolver {
  constructor(
    private readonly meetingInviteeService: MeetingInviteeService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => MeetingInvitee)
  async createMeetingInvitee(
    @Args('createMeetingInviteeInput')
    createMeetingInviteeInput: CreateMeetingInviteeInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingInviteeService.create(
          createMeetingInviteeInput,
          prisma,
        );
      },
    );
  }

  @Query(() => [MeetingInvitee])
  meetingInvitees(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterMeetingInviteeInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingInviteeService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => MeetingInvitee, { name: 'meetingInvitee' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingInviteeService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => MeetingInvitee)
  async updateMeetingInvitee(
    @Args('updateMeetingInviteeInput')
    updateMeetingInviteeInput: UpdateMeetingInviteeInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingInviteeService.update(
          updateMeetingInviteeInput.id,
          updateMeetingInviteeInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => MeetingInvitee)
  async removeMeetingInvitee(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingInviteeService.remove(id, prisma);
      },
    );
  }
}
