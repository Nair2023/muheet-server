import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Global, Module } from '@nestjs/common';
import { EnvVariables } from './configurations/configuration.interface';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      useFactory: (configService: ConfigService<EnvVariables>) =>
        new RedisPubSub({
          connection: {
            db: 5,
            host: configService.get('REDIS_MESSAGING_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        }),
      inject: [ConfigService],
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
