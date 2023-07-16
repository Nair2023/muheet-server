import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeviceService } from './device.service';
import { Device } from './entities/device.entity';
import {
  CreateDeviceInput,
  FilterDeviceInput,
} from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Device)
export class DeviceResolver {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Device)
  async createDevice(
    @Args('createDeviceInput') createDeviceInput: CreateDeviceInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deviceService.create(createDeviceInput, prisma);
      },
    );
  }

  @Query(() => [Device])
  devices(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterDeviceInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deviceService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Device, { name: 'device' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deviceService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Device)
  async updateDevice(
    @Args('updateDeviceInput') updateDeviceInput: UpdateDeviceInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deviceService.update(
          updateDeviceInput.id,
          updateDeviceInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Device)
  async removeDevice(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deviceService.remove(id, prisma);
      },
    );
  }
}
