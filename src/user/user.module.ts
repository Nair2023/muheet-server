import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserResolver, UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
