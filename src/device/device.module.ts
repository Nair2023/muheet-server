import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceResolver } from './device.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [DeviceResolver, DeviceService, PrismaService],
})
export class DeviceModule {}
