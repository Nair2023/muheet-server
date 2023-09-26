import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReminderService } from './reminder.service';
import { Reminder } from './entities/reminder.entity';
import {
  CreateReminderInput,
  FilterReminderInput,
} from './dto/create-reminder.input';
import { UpdateReminderInput } from './dto/update-reminder.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Reminder)
export class ReminderResolver {
  constructor(
    private readonly reminderService: ReminderService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Reminder)
  async createReminder(
    @Args('createReminderInput') createReminderInput: CreateReminderInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.reminderService.create(createReminderInput, prisma);
      },
    );
  }

  @Query(() => [Reminder])
  reminders(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterReminderInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.reminderService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Reminder, { name: 'reminder' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.reminderService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Reminder)
  async updateReminder(
    @Args('updateReminderInput') updateReminderInput: UpdateReminderInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.reminderService.update(
          updateReminderInput.id,
          updateReminderInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Reminder)
  async removeReminder(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.reminderService.remove(id, prisma);
      },
    );
  }
}
