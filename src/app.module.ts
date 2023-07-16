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
import { CompanyModule } from './company/company.module';
import { TagModule } from './tag/tag.module';
import { LabelModule } from './label/label.module';
import { TrashModule } from './trash/trash.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';
import { SettingModule } from './setting/setting.module';

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
    CompanyModule,
    TagModule,
    LabelModule,
    TrashModule,
    CountryModule,
    CityModule,
    SettingModule,
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
