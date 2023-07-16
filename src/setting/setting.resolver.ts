import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SettingService } from './setting.service';
import { Setting } from './entities/setting.entity';
import {
  CreateSettingInput,
  FilterSettingInput,
} from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Setting)
export class SettingResolver {
  constructor(
    private readonly settingService: SettingService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Setting)
  async createSetting(
    @Args('createSettingInput') createSettingInput: CreateSettingInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.settingService.create(createSettingInput, prisma);
      },
    );
  }

  @Query(() => [Setting])
  settings(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterSettingInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.settingService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Setting, { name: 'setting' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.settingService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Setting)
  async updateSetting(
    @Args('updateSettingInput') updateSettingInput: UpdateSettingInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.settingService.update(
          updateSettingInput.id,
          updateSettingInput,
          prisma,
        );
      },
    );
  }
}
