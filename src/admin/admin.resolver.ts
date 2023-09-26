import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput, FilterAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Admin)
  async createAdmin(
    @Args('createAdminInput') createAdminInput: CreateAdminInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.adminService.create(createAdminInput, prisma);
      },
    );
  }

  @Query(() => [Admin])
  admins(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('filter', { nullable: true }) filter?: FilterAdminInput,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.adminService.findAll(
          prisma,
          page,
          pageSize,
          filter,
          search,
        );
      },
    );
  }

  @Query(() => Admin, { name: 'admin' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.adminService.findOne(id, prisma);
      },
    );
  }

  @Mutation(() => Admin)
  async updateAdmin(
    @Args('updateAdminInput') updateAdminInput: UpdateAdminInput,
  ) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.adminService.update(
          updateAdminInput.id,
          updateAdminInput,
          prisma,
        );
      },
    );
  }

  @Mutation(() => Admin)
  async removeAdmin(@Args('id', { type: () => Int }) id: number) {
    return this.prismaService.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        return this.adminService.remove(id, prisma);
      },
    );
  }
}
