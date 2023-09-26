import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SharedNoteService } from './shared-note.service';
import { SharedNote } from './entities/shared-note.entity';
import {
  CreateSharedNoteInput,
  FilterSharedNoteInput,
} from './dto/create-shared-note.input';
import { UpdateSharedNoteInput } from './dto/update-shared-note.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => SharedNote)
export class SharedNoteResolver {
  constructor(
    private readonly sharedNoteService: SharedNoteService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => SharedNote)
  async createSharedNote(
    @Args('createSharedNoteInput') createSharedNoteInput: CreateSharedNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedNoteService.create(createSharedNoteInput, prisma);
      },
    );
  }

  @Query(() => [SharedNote])
  sharedNotes(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterSharedNoteInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedNoteService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => SharedNote, { name: 'sharedNote' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedNoteService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => SharedNote)
  async updateSharedNote(
    @Args('updateSharedNoteInput') updateSharedNoteInput: UpdateSharedNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedNoteService.update(
          updateSharedNoteInput.id,
          updateSharedNoteInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => SharedNote)
  async removeSharedNote(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.sharedNoteService.remove(id, prisma);
      },
    );
  }
}
