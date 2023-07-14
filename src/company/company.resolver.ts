import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import {
  CreateCompanyInput,
  FilterCompanyInput,
} from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { CurrentAccount } from 'src/utils/decorators/account.decorator';
import { Account } from 'src/account/entities/account.entity';
import { UseGuards } from '@nestjs/common';
import { CustomAuthGuard } from 'src/utils/guards/auth.guard';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(
    private readonly companyService: CompanyService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(CustomAuthGuard)
  @Mutation(() => Company)
  createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
    @CurrentAccount() account: Account,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyService.create(
          { creator_id: account.id, ...createCompanyInput },
          prisma,
        );
      },
    );
  }

  @Query(() => [Company])
  companies(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterCompanyInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Company, { name: 'company' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Company)
  updateCompany(
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyService.update(
          updateCompanyInput.id,
          updateCompanyInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Company)
  deleteCompany(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.companyService.remove(id, prisma);
      },
    );
  }
}
