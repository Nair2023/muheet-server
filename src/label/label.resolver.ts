import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LabelService } from './label.service';
import { Label } from './entities/label.entity';
import { CreateLabelInput, FilterLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Label)
export class LabelResolver {
  constructor(
    private readonly labelService: LabelService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Label)
  async createLabel(
    @Args('createLabelInput') createLabelInput: CreateLabelInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.labelService.create(createLabelInput, prisma);
      },
    );
  }

  @Query(() => [Label])
  labels(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterLabelInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.labelService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Label, { name: 'label' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.labelService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Label)
  async updateLabel(
    @Args('updateLabelInput') updateLabelInput: UpdateLabelInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.labelService.update(
          updateLabelInput.id,
          updateLabelInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Label)
  async removeLabel(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.labelService.remove(id, prisma);
      },
    );
  }
}
