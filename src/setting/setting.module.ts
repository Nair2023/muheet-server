import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingResolver } from './setting.resolver';
import { PrismaService } from '../prisma.service';
import { SettingController } from './setting.controller';

@Module({
  providers: [SettingResolver, SettingService, PrismaService],
  controllers: [SettingController],
})
export class SettingModule {}
