import { Module } from '@nestjs/common';
import { SystemConfigUploadService } from './system-config-upload.service';
import { SystemConfigUploadResolver } from './system-config-upload.resolver';
import { PrismaService } from '../prisma.service';
import { SystemConfigUploadController } from './system-config-upload.controller';

@Module({
  providers: [
    SystemConfigUploadResolver,
    SystemConfigUploadService,
    PrismaService,
  ],
  controllers: [SystemConfigUploadController],
})
export class SystemConfigUploadModule {}
