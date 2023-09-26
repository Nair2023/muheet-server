import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeetingService } from './meeting.service';
import { Meeting } from './entities/meeting.entity';
import {
  CreateMeetingInput,
  FilterMeetingInput,
} from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Meeting)
export class MeetingResolver {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Meeting)
  async createMeeting(
    @Args('createMeetingInput') createMeetingInput: CreateMeetingInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingService.create(createMeetingInput, prisma);
      },
    );
  }

  @Query(() => [Meeting])
  meetings(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterMeetingInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Meeting, { name: 'meeting' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Meeting)
  async updateMeeting(
    @Args('updateMeetingInput') updateMeetingInput: UpdateMeetingInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingService.update(
          updateMeetingInput.id,
          updateMeetingInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Meeting)
  async removeMeeting(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.meetingService.remove(id, prisma);
      },
    );
  }
}
