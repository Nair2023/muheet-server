import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SystemConfigService } from './system-config.service';
import { SystemConfig } from './entities/system-config.entity';
import {
  CreateSystemConfigInput,
  FilterSystemConfigInput,
} from './dto/create-system-config.input';
import { UpdateSystemConfigInput } from './dto/update-system-config.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => SystemConfig)
export class SystemConfigResolver {
  constructor(
    private readonly systemConfigService: SystemConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => SystemConfig)
  async createSystemConfig(
    @Args('createSystemConfigInput')
    createSystemConfigInput: CreateSystemConfigInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigService.create(createSystemConfigInput, prisma);
      },
    );
  }

  @Query(() => [SystemConfig])
  systemConfigs(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterSystemConfigInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => SystemConfig, { name: 'systemConfig' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => SystemConfig)
  async updateSystemConfig(
    @Args('updateSystemConfigInput')
    updateSystemConfigInput: UpdateSystemConfigInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigService.update(
          updateSystemConfigInput.id,
          updateSystemConfigInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => SystemConfig)
  async removeSystemConfig(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigService.remove(id, prisma);
      },
    );
  }
}
