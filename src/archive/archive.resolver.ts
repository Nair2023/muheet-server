import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArchiveService } from './archive.service';
import { Archive } from './entities/archive.entity';
import {
  CreateArchiveInput,
  FilterArchiveInput,
} from './dto/create-archive.input';
import { UpdateArchiveInput } from './dto/update-archive.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Archive)
export class ArchiveResolver {
  constructor(
    private readonly archiveService: ArchiveService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Archive)
  async createArchive(
    @Args('createArchiveInput') createArchiveInput: CreateArchiveInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.archiveService.create(createArchiveInput, prisma);
      },
    );
  }

  @Query(() => [Archive])
  archives(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterArchiveInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.archiveService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Archive, { name: 'archive' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.archiveService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Archive)
  async updateArchive(
    @Args('updateArchiveInput') updateArchiveInput: UpdateArchiveInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.archiveService.update(
          updateArchiveInput.id,
          updateArchiveInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Boolean)
  async removeArchive(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.archiveService.remove(id, prisma);
      },
    );
  }
}
