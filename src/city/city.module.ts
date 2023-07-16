import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityResolver } from './city.resolver';
import { PrismaService } from '../prisma.service';
import { CityController } from './city.controller';

@Module({
  providers: [CityResolver, CityService, PrismaService],
  controllers: [CityController],
})
export class CityModule {}
