import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeadlineService } from './deadline.service';
import { Deadline } from './entities/deadline.entity';
import {
  CreateDeadlineInput,
  FilterDeadlineInput,
} from './dto/create-deadline.input';
import { UpdateDeadlineInput } from './dto/update-deadline.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Deadline)
export class DeadlineResolver {
  constructor(
    private readonly deadlineService: DeadlineService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Deadline)
  async createDeadline(
    @Args('createDeadlineInput') createDeadlineInput: CreateDeadlineInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineService.create(createDeadlineInput, prisma);
      },
    );
  }

  @Query(() => [Deadline])
  deadlines(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterDeadlineInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Deadline, { name: 'deadline' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Deadline)
  async updateDeadline(
    @Args('updateDeadlineInput') updateDeadlineInput: UpdateDeadlineInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineService.update(
          updateDeadlineInput.id,
          updateDeadlineInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Deadline)
  async removeDeadline(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineService.remove(id, prisma);
      },
    );
  }
}
