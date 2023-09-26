import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeadlineFighterService } from './deadline-fighter.service';
import { DeadlineFighter } from './entities/deadline-fighter.entity';
import {
  CreateDeadlineFighterInput,
  FilterDeadlineFighterInput,
} from './dto/create-deadline-fighter.input';
import { UpdateDeadlineFighterInput } from './dto/update-deadline-fighter.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => DeadlineFighter)
export class DeadlineFighterResolver {
  constructor(
    private readonly deadlineFighterService: DeadlineFighterService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => DeadlineFighter)
  async createDeadlineFighter(
    @Args('createDeadlineFighterInput')
    createDeadlineFighterInput: CreateDeadlineFighterInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineFighterService.create(
          createDeadlineFighterInput,
          prisma,
        );
      },
    );
  }

  @Query(() => [DeadlineFighter])
  deadlineFighters(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterDeadlineFighterInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineFighterService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => DeadlineFighter, { name: 'deadlineFighter' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineFighterService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => DeadlineFighter)
  async updateDeadlineFighter(
    @Args('updateDeadlineFighterInput')
    updateDeadlineFighterInput: UpdateDeadlineFighterInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineFighterService.update(
          updateDeadlineFighterInput.id,
          updateDeadlineFighterInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => DeadlineFighter)
  async removeDeadlineFighter(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.deadlineFighterService.remove(id, prisma);
      },
    );
  }
}
