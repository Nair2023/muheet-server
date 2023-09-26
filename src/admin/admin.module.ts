import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { PrismaService } from '../prisma.service';
import { AdminController } from './admin.controller';

@Module({
  providers: [AdminResolver, AdminService, PrismaService],
  controllers: [AdminController],
})
export class AdminModule {}
