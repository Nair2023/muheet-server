import { Module } from '@nestjs/common';
import { TrashUploadService } from './trash-upload.service';
import { TrashUploadResolver } from './trash-upload.resolver';
import { PrismaService } from '../prisma.service';
import { TrashUploadController } from './trash-upload.controller';

@Module({
  providers: [TrashUploadResolver, TrashUploadService, PrismaService],
  controllers: [TrashUploadController],
})
export class TrashUploadModule {}
