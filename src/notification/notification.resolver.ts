import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import {
  CreateNotificationInput,
  FilterNotificationInput,
} from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Notification)
  async createNotification(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.notificationService.create(createNotificationInput, prisma);
      },
    );
  }

  @Query(() => [Notification])
  notifications(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterNotificationInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.notificationService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Notification, { name: 'notification' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.notificationService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Notification)
  async updateNotification(
    @Args('updateNotificationInput')
    updateNotificationInput: UpdateNotificationInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.notificationService.update(
          updateNotificationInput.id,
          updateNotificationInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Notification)
  async removeNotification(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.notificationService.remove(id, prisma);
      },
    );
  }
}
