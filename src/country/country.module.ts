import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';
import { PrismaService } from '../prisma.service';
import { CountryController } from './country.controller';

@Module({
  providers: [CountryResolver, CountryService, PrismaService],
  controllers: [CountryController],
})
export class CountryModule {}
