import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { AccountModule } from '../account/account.module';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../utils/strategies/jwt.strategy';

@Module({
  imports: [ConfigModule, AccountModule],
  providers: [TokenService, PrismaService, JwtStrategy, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
