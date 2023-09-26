import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';
import { PrismaService } from '../prisma.service';
import { ClientController } from './client.controller';

@Module({
  providers: [ClientResolver, ClientService, PrismaService],
  controllers: [ClientController],
})
export class ClientModule {}
