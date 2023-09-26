import { Module } from '@nestjs/common';
import { CompanyClientService } from './company-client.service';
import { CompanyClientResolver } from './company-client.resolver';
import { PrismaService } from '../prisma.service';
import { CompanyClientController } from './company-client.controller';

@Module({
  providers: [CompanyClientResolver, CompanyClientService, PrismaService],
  controllers: [CompanyClientController],
})
export class CompanyClientModule {}
