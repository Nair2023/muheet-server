import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TrashUploadService } from './trash-upload.service';
import { TrashUpload } from './entities/trash-upload.entity';
import {
  CreateTrashUploadInput,
  FilterTrashUploadInput,
} from './dto/create-trash-upload.input';
import { UpdateTrashUploadInput } from './dto/update-trash-upload.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => TrashUpload)
export class TrashUploadResolver {
  constructor(
    private readonly trashUploadService: TrashUploadService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => TrashUpload)
  async createTrashUpload(
    @Args('createTrashUploadInput')
    createTrashUploadInput: CreateTrashUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashUploadService.create(createTrashUploadInput, prisma);
      },
    );
  }

  @Query(() => [TrashUpload])
  trashUploads(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterTrashUploadInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashUploadService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => TrashUpload, { name: 'trashUpload' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashUploadService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => TrashUpload)
  async updateTrashUpload(
    @Args('updateTrashUploadInput')
    updateTrashUploadInput: UpdateTrashUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashUploadService.update(
          updateTrashUploadInput.id,
          updateTrashUploadInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => TrashUpload)
  async removeTrashUpload(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashUploadService.remove(id, prisma);
      },
    );
  }
}
