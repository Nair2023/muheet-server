import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GuestService } from './guest.service';
import { Guest } from './entities/guest.entity';
import { CreateGuestInput } from './dto/create-guest.input';
import { UpdateGuestInput } from './dto/update-guest.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import {
  TokenReturn,
  TokenReturnWithGuestId,
} from '../token/entities/token.entity';
import { CurrentDevice } from '../utils/decorators/device.decorator';
import { CurrentToken } from '../utils/decorators/token.decorator';

@Resolver(() => Guest)
export class GuestResolver {
  constructor(
    private readonly guestService: GuestService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => TokenReturnWithGuestId)
  async createGuest(
    @Args('createGuestInput') createGuestInput: CreateGuestInput,
    @CurrentDevice() device_id: number,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.guestService.create(createGuestInput, device_id, prisma);
      },
    );
  }

  @Query(() => [Guest], { name: 'guests' })
  async findAll() {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.guestService.findAll(prisma);
      },
    );
  }

  @Query(() => Guest, { name: 'guest' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.guestService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Guest)
  async updateGuest(
    @Args('updateGuestInput') updateGuestInput: UpdateGuestInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.guestService.update(
          updateGuestInput.id,
          updateGuestInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Guest)
  async removeGuest(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.guestService.remove(id, prisma);
      },
    );
  }

  @Mutation(() => TokenReturn)
  async guestLogin(
    @Args('guest_id') guest_id: string,
    @CurrentDevice() device_id: number,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.guestService.guestLogin(guest_id, device_id, prisma);
      },
    );
  }

  @Mutation(() => Boolean)
  async logoutGuest(
    @CurrentToken() token: string,
    @CurrentDevice() device_id: string,
  ) {
    return this.prismaService.$transaction(async (prisma) => {
      return this.guestService.logoutGuest(
        token.replace('Bearer ', ''),
        prisma,
        device_id,
      );
    });
  }
}
