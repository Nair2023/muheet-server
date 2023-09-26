import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CooperativeNoteService } from './cooperative-note.service';
import { CooperativeNote } from './entities/cooperative-note.entity';
import {
  CreateCooperativeNoteInput,
  FilterCooperativeNoteInput,
} from './dto/create-cooperative-note.input';
import { UpdateCooperativeNoteInput } from './dto/update-cooperative-note.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => CooperativeNote)
export class CooperativeNoteResolver {
  constructor(
    private readonly cooperativeNoteService: CooperativeNoteService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => CooperativeNote)
  async createCooperativeNote(
    @Args('createCooperativeNoteInput')
    createCooperativeNoteInput: CreateCooperativeNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeNoteService.create(
          createCooperativeNoteInput,
          prisma,
        );
      },
    );
  }

  @Query(() => [CooperativeNote])
  cooperativeNotes(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterCooperativeNoteInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeNoteService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => CooperativeNote, { name: 'cooperativeNote' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeNoteService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => CooperativeNote)
  async updateCooperativeNote(
    @Args('updateCooperativeNoteInput')
    updateCooperativeNoteInput: UpdateCooperativeNoteInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeNoteService.update(
          updateCooperativeNoteInput.id,
          updateCooperativeNoteInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => CooperativeNote)
  async removeCooperativeNote(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.cooperativeNoteService.remove(id, prisma);
      },
    );
  }
}
