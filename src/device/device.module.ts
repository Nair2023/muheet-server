import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceResolver } from './device.resolver';
import { PrismaService } from '../prisma.service';
import { DeviceController } from './device.controller';

@Module({
  providers: [DeviceResolver, DeviceService, PrismaService],
  controllers: [DeviceController],
})
export class DeviceModule {}
