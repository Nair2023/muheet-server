import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import { PrismaService } from '../prisma.service';
import { UploadController } from './upload.controller';

@Module({
  providers: [UploadResolver, UploadService, PrismaService],
  controllers: [UploadController],
})
export class UploadModule {}
