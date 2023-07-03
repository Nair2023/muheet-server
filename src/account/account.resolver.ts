import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import {
  CreateAccountInput,
  FilterAccountInput,
} from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { CurrentDevice } from '../utils/decorators/device.decorator';
import { Inject, forwardRef } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { LoginDto } from '../token/dto/login.input';

@Resolver(() => Account)
export class AccountResolver {
  constructor(
    private readonly accountService: AccountService,
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService,
  ) {}

  @Mutation(() => Account)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
    @CurrentDevice() deviceId: number,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.accountService.create(createAccountInput, deviceId, prisma);
      },
    );
  }

  @Mutation(() => Account)
  async login(
    @Args('loginInput') loginInput: LoginDto,
    @CurrentDevice() deviceId: number,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.tokenService.login(loginInput, deviceId, prisma);
      },
    );
  }

  @Query(() => [Account], { name: 'accounts' })
  async findAll(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterAccountInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.accountService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Account, { name: 'account' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.accountService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Account)
  async updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.accountService.update(
          updateAccountInput.id,
          updateAccountInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Account)
  async removeAccount(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.accountService.remove(id, prisma);
      },
    );
  }
}
