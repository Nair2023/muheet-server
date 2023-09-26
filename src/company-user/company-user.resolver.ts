import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyUserService } from './company-user.service';
import { CompanyUser } from './entities/company-user.entity';
import {
  CreateCompanyUserInput,
  FilterCompanyUserInput,
} from './dto/create-company-user.input';
import { UpdateCompanyUserInput } from './dto/update-company-user.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => CompanyUser)
export class CompanyUserResolver {
  constructor(
    private readonly companyUserService: CompanyUserService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => CompanyUser)
  async createCompanyUser(
    @Args('createCompanyUserInput')
    createCompanyUserInput: CreateCompanyUserInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyUserService.create(createCompanyUserInput, prisma);
      },
    );
  }

  @Query(() => [CompanyUser])
  companyUsers(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterCompanyUserInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyUserService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => CompanyUser, { name: 'companyUser' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyUserService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => CompanyUser)
  async updateCompanyUser(
    @Args('updateCompanyUserInput')
    updateCompanyUserInput: UpdateCompanyUserInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyUserService.update(
          updateCompanyUserInput.id,
          updateCompanyUserInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => CompanyUser)
  async removeCompanyUser(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyUserService.remove(id, prisma);
      },
    );
  }
}
