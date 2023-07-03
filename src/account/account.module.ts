import { Module, forwardRef } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { PrismaService } from '../prisma.service';
import { SendEmailHelper } from '../utils/helpers/sending-email.helper';
import { TokenModule } from '../token/token.module';
import { AccountController } from './account.controller';

@Module({
  imports: [forwardRef(() => TokenModule)],
  providers: [AccountResolver, AccountService, PrismaService, SendEmailHelper],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
