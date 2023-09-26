import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyClientService } from './company-client.service';
import { CompanyClient } from './entities/company-client.entity';
import {
  CreateCompanyClientInput,
  FilterCompanyClientInput,
} from './dto/create-company-client.input';
import { UpdateCompanyClientInput } from './dto/update-company-client.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => CompanyClient)
export class CompanyClientResolver {
  constructor(
    private readonly companyClientService: CompanyClientService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => CompanyClient)
  async createCompanyClient(
    @Args('createCompanyClientInput')
    createCompanyClientInput: CreateCompanyClientInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyClientService.create(
          createCompanyClientInput,
          prisma,
        );
      },
    );
  }

  @Query(() => [CompanyClient])
  companyClients(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterCompanyClientInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyClientService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => CompanyClient, { name: 'companyClient' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyClientService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => CompanyClient)
  async updateCompanyClient(
    @Args('updateCompanyClientInput')
    updateCompanyClientInput: UpdateCompanyClientInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyClientService.update(
          updateCompanyClientInput.id,
          updateCompanyClientInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => CompanyClient)
  async removeCompanyClient(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyClientService.remove(id, prisma);
      },
    );
  }
}
