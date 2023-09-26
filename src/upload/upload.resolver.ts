import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { Upload } from './entities/upload.entity';
import {
  CreateUploadInput,
  FilterUploadInput,
} from './dto/create-upload.input';
import { UpdateUploadInput } from './dto/update-upload.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Upload)
export class UploadResolver {
  constructor(
    private readonly uploadService: UploadService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Upload)
  async createUpload(
    @Args('createUploadInput') createUploadInput: CreateUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.uploadService.create(createUploadInput, prisma);
      },
    );
  }

  @Query(() => [Upload])
  uploads(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterUploadInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.uploadService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Upload, { name: 'upload' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.uploadService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Upload)
  async updateUpload(
    @Args('updateUploadInput') updateUploadInput: UpdateUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.uploadService.update(
          updateUploadInput.id,
          updateUploadInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Boolean)
  async removeUpload(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.uploadService.remove(id, prisma);
      },
    );
  }
}
