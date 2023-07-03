/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { GraphQLConfig } from './configurations/graphql.configs';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { PubSubModule } from './pubsub.module';
import { TokenModule } from './token/token.module';
import { AccountModule } from './account/account.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { APIKeyGuard } from './utils/guards/key.guard';
import { GuestModule } from './guest/guest.module';
import { NoteModule } from './note/note.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfig } from './configurations/mailer.configs';
import { LoggerInterceptor } from './utils/interceptors/logger.interceptor';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphQLConfig,
    }),
    MailerModule.forRootAsync({ useClass: MailerConfig }),
    PubSubModule,
    TokenModule,
    AccountModule,
    GuestModule,
    NoteModule,
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    AppResolver,
    {
      provide: APP_GUARD,
      useClass: APIKeyGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
