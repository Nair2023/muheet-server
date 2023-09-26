import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NoteLabelService } from './note-label.service';
import { NoteLabel } from './entities/note-label.entity';
import {
  CreateNoteLabelInput,
  FilterNoteLabelInput,
} from './dto/create-note-label.input';
import { UpdateNoteLabelInput } from './dto/update-note-label.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => NoteLabel)
export class NoteLabelResolver {
  constructor(
    private readonly noteLabelService: NoteLabelService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => NoteLabel)
  async createNoteLabel(
    @Args('createNoteLabelInput') createNoteLabelInput: CreateNoteLabelInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteLabelService.create(createNoteLabelInput, prisma);
      },
    );
  }

  @Query(() => [NoteLabel])
  noteLabels(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterNoteLabelInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteLabelService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => NoteLabel, { name: 'noteLabel' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteLabelService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => NoteLabel)
  async updateNoteLabel(
    @Args('updateNoteLabelInput') updateNoteLabelInput: UpdateNoteLabelInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteLabelService.update(
          updateNoteLabelInput.id,
          updateNoteLabelInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => NoteLabel)
  async removeNoteLabel(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteLabelService.remove(id, prisma);
      },
    );
  }
}
