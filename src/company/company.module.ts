import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { PrismaService } from '../prisma.service';
import { CompanyController } from './company.controller';

@Module({
  providers: [CompanyResolver, CompanyService, PrismaService],
  controllers: [CompanyController],
})
export class CompanyModule {}
