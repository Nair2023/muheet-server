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
import { SharedNoteModule } from './shared-note/shared-note.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { CompanyUserModule } from './company-user/company-user.module';
import { CompanyClientModule } from './company-client/company-client.module';
import { ClientModule } from './client/client.module';
import { MeetingModule } from './meeting/meeting.module';
import { MeetingInviteeModule } from './meeting-invitee/meeting-invitee.module';
import { CooperativeNoteModule } from './cooperative-note/cooperative-note.module';
import { CategoryModule } from './category/category.module';
import { CooperativeCollectionModule } from './cooperative-collection/cooperative-collection.module';
import { SharedCollectionModule } from './shared-collection/shared-collection.module';
import { CollectionModule } from './collection/collection.module';
import { NoteCollectionModule } from './note-collection/note-collection.module';
import { TagCollectionModule } from './tag-collection/tag-collection.module';
import { CategoryNoteModule } from './category-note/category-note.module';
import { CategoryLabelModule } from './category-label/category-label.module';
import { NoteUploadModule } from './note-upload/note-upload.module';
import { NoteLabelModule } from './note-label/note-label.module';
import { ArchiveModule } from './archive/archive.module';
import { TrashUploadModule } from './trash-upload/trash-upload.module';
import { TrashNoteModule } from './trash-note/trash-note.module';
import { UploadModule } from './upload/upload.module';
import { SystemConfigModule } from './system-config/system-config.module';
import { SystemConfigUploadModule } from './system-config-upload/system-config-upload.module';
import { NotificationModule } from './notification/notification.module';
import { ReminderModule } from './reminder/reminder.module';
import { DeadlineModule } from './deadline/deadline.module';
import { DeadlineFighterModule } from './deadline-fighter/deadline-fighter.module';

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
    SharedNoteModule,
    AdminModule,
    UserModule,
    CompanyUserModule,
    CompanyClientModule,
    ClientModule,
    MeetingModule,
    MeetingInviteeModule,
    CooperativeNoteModule,
    CategoryModule,
    CooperativeCollectionModule,
    SharedCollectionModule,
    CollectionModule,
    NoteCollectionModule,
    TagCollectionModule,
    CategoryNoteModule,
    CategoryLabelModule,
    NoteUploadModule,
    NoteLabelModule,
    ArchiveModule,
    TrashUploadModule,
    TrashNoteModule,
    UploadModule,
    SystemConfigModule,
    SystemConfigUploadModule,
    NotificationModule,
    ReminderModule,
    DeadlineModule,
    DeadlineFighterModule,
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
