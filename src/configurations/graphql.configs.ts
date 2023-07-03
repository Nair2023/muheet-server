import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { EnvVariables } from './configuration.interface';

/**
 * GraphQL Configuration
 * @class GraphQLConfig
 * @implements {GqlOptionsFactory}
 */
@Injectable()
export class GraphQLConfig implements GqlOptionsFactory {
  private logger: Logger;
  constructor(private readonly configService: ConfigService<EnvVariables>) {
    this.logger = new Logger('GraphQL');
  }
  createGqlOptions(): GqlModuleOptions {
    const configs = {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: this.configService.get('ENV') === 'development',
      playground: true,
      path: 'graphql',
      installSubscriptionHandlers: true,
      subscriptions: {
        path: '/graphql/subscription',
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      definitions: {
        customScalarTypeMapping: {
          DateTime: 'Date',
        },
      },
      introspection: true,
      context: ({ req, res, connection }) => {
        return connection
          ? { req: { headers: connection.context } }
          : { req, res };
      },
    } as GqlModuleOptions;

    if (this.configService.get('ENV') === 'development')
      this.logger.verbose(configs);

    return configs;
  }
}
