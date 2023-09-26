import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NoteUploadService } from './note-upload.service';
import { NoteUpload } from './entities/note-upload.entity';
import {
  CreateNoteUploadInput,
  FilterNoteUploadInput,
} from './dto/create-note-upload.input';
import { UpdateNoteUploadInput } from './dto/update-note-upload.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => NoteUpload)
export class NoteUploadResolver {
  constructor(
    private readonly noteUploadService: NoteUploadService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => NoteUpload)
  async createNoteUpload(
    @Args('createNoteUploadInput') createNoteUploadInput: CreateNoteUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteUploadService.create(createNoteUploadInput, prisma);
      },
    );
  }

  @Query(() => [NoteUpload])
  noteUploads(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterNoteUploadInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteUploadService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => NoteUpload, { name: 'noteUpload' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteUploadService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => NoteUpload)
  async updateNoteUpload(
    @Args('updateNoteUploadInput') updateNoteUploadInput: UpdateNoteUploadInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteUploadService.update(
          updateNoteUploadInput.id,
          updateNoteUploadInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => NoteUpload)
  async removeNoteUpload(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.noteUploadService.remove(id, prisma);
      },
    );
  }
}
