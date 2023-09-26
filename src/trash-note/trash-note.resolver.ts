import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TrashNoteService } from './trash-note.service';
import { TrashNote } from './entities/trash-note.entity';
import {
  CreateTrashNoteInput,
  FilterTrashNoteInput,
} from './dto/create-trash-note.input';
import { UpdateTrashNoteInput } from './dto/update-trash-note.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => TrashNote)
export class TrashNoteResolver {
  constructor(
    private readonly trashNoteService: TrashNoteService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => TrashNote)
  async createTrashNote(
    @Args('createTrashNoteInput') createTrashNoteInput: CreateTrashNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashNoteService.create(createTrashNoteInput, prisma);
      },
    );
  }

  @Query(() => [TrashNote])
  trashNotes(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterTrashNoteInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashNoteService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => TrashNote, { name: 'trashNote' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashNoteService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => TrashNote)
  async updateTrashNote(
    @Args('updateTrashNoteInput') updateTrashNoteInput: UpdateTrashNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashNoteService.update(
          updateTrashNoteInput.id,
          updateTrashNoteInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => TrashNote)
  async removeTrashNote(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashNoteService.remove(id, prisma);
      },
    );
  }
}
