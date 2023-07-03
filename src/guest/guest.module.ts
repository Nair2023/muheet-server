import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestResolver } from './guest.resolver';
import { PrismaService } from '../prisma.service';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TokenModule],
  providers: [GuestResolver, GuestService, PrismaService],
})
export class GuestModule {}
