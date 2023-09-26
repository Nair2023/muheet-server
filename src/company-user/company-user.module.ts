import { Module } from '@nestjs/common';
import { CompanyUserService } from './company-user.service';
import { CompanyUserResolver } from './company-user.resolver';
import { PrismaService } from '../prisma.service';
import { CompanyUserController } from './company-user.controller';

@Module({
  providers: [CompanyUserResolver, CompanyUserService, PrismaService],
  controllers: [CompanyUserController],
})
export class CompanyUserModule {}
