import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TrashService } from './trash.service';
import { Trash } from './entities/trash.entity';
import { CreateTrashInput, FilterTrashInput } from './dto/create-trash.input';
import { UpdateTrashInput } from './dto/update-trash.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Trash)
export class TrashResolver {
  constructor(
    private readonly trashService: TrashService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Trash)
  async createTrash(
    @Args('createTrashInput') createTrashInput: CreateTrashInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashService.create(createTrashInput, prisma);
      },
    );
  }

  @Query(() => [Trash])
  trashes(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterTrashInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Trash, { name: 'trash' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Trash)
  async updateTrash(
    @Args('updateTrashInput') updateTrashInput: UpdateTrashInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.trashService.update(
          updateTrashInput.id,
          updateTrashInput,
          prisma,
        );
      },
    );
  }
}
