import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NoteService } from './note.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Note)
export class NoteResolver {
  constructor(
    private readonly noteService: NoteService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Note)
  async createNote(@Args('createNoteInput') createNoteInput: CreateNoteInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteService.create(createNoteInput, prisma);
      },
    );
  }

  @Query(() => [Note], { name: 'notes' })
  async findAll() {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteService.findAll(prisma);
      },
    );
  }

  @Query(() => Note, { name: 'note' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Note)
  async updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteService.update(
          updateNoteInput.id,
          updateNoteInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Note)
  async removeNote(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteService.remove(id, prisma);
      },
    );
  }
}
