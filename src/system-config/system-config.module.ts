import { Module } from '@nestjs/common';
import { SystemConfigService } from './system-config.service';
import { SystemConfigResolver } from './system-config.resolver';
import { PrismaService } from '../prisma.service';
import { SystemConfigController } from './system-config.controller';

@Module({
  providers: [SystemConfigResolver, SystemConfigService, PrismaService],
  controllers: [SystemConfigController],
})
export class SystemConfigModule {}
