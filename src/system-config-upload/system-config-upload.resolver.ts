import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SystemConfigUploadService } from './system-config-upload.service';
import { SystemConfigUpload } from './entities/system-config-upload.entity';
import {
  CreateSystemConfigUploadInput,
  FilterSystemConfigUploadInput,
} from './dto/create-system-config-upload.input';
import { UpdateSystemConfigUploadInput } from './dto/update-system-config-upload.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => SystemConfigUpload)
export class SystemConfigUploadResolver {
  constructor(
    private readonly systemConfigUploadService: SystemConfigUploadService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => SystemConfigUpload)
  async createSystemConfigUpload(
    @Args('createSystemConfigUploadInput')
    createSystemConfigUploadInput: CreateSystemConfigUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigUploadService.create(
          createSystemConfigUploadInput,
          prisma,
        );
      },
    );
  }

  @Query(() => [SystemConfigUpload])
  systemConfigUploads(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterSystemConfigUploadInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigUploadService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => SystemConfigUpload, { name: 'systemConfigUpload' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigUploadService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => SystemConfigUpload)
  async updateSystemConfigUpload(
    @Args('updateSystemConfigUploadInput')
    updateSystemConfigUploadInput: UpdateSystemConfigUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigUploadService.update(
          updateSystemConfigUploadInput.id,
          updateSystemConfigUploadInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => SystemConfigUpload)
  async removeSystemConfigUpload(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.systemConfigUploadService.remove(id, prisma);
      },
    );
  }
}
