import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import {
  CreateClientInput,
  FilterClientInput,
} from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Client)
export class ClientResolver {
  constructor(
    private readonly clientService: ClientService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Client)
  async createClient(
    @Args('createClientInput') createClientInput: CreateClientInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.clientService.create(createClientInput, prisma);
      },
    );
  }

  @Query(() => [Client])
  clients(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterClientInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.clientService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Client, { name: 'client' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.clientService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Client)
  async updateClient(
    @Args('updateClientInput') updateClientInput: UpdateClientInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.clientService.update(
          updateClientInput.id,
          updateClientInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Client)
  async removeClient(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.clientService.remove(id, prisma);
      },
    );
  }
}
