import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NoteCollectionService } from './note-collection.service';
import { NoteCollection } from './entities/note-collection.entity';
import {
  CreateNoteCollectionInput,
  FilterNoteCollectionInput,
} from './dto/create-note-collection.input';
import { UpdateNoteCollectionInput } from './dto/update-note-collection.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => NoteCollection)
export class NoteCollectionResolver {
  constructor(
    private readonly noteCollectionService: NoteCollectionService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => NoteCollection)
  async createNoteCollection(
    @Args('createNoteCollectionInput')
    createNoteCollectionInput: CreateNoteCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteCollectionService.create(
          createNoteCollectionInput,
          prisma,
        );
      },
    );
  }

  @Query(() => [NoteCollection])
  noteCollections(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterNoteCollectionInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteCollectionService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => NoteCollection, { name: 'noteCollection' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteCollectionService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => NoteCollection)
  async updateNoteCollection(
    @Args('updateNoteCollectionInput')
    updateNoteCollectionInput: UpdateNoteCollectionInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteCollectionService.update(
          updateNoteCollectionInput.id,
          updateNoteCollectionInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => NoteCollection)
  async removeNoteCollection(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteCollectionService.remove(id, prisma);
      },
    );
  }
}
