import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { join } from 'path';
import { EnvVariables } from './configurations/configuration.interface';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SetupSwagger } from './configurations/swagger.configs';

const development = process.env.ENV === 'development';

async function bootstrap() {
  const key = readFileSync(join(__dirname, '../ssl/localhost.decrypted.key'));
  const cert = readFileSync(join(__dirname, '../ssl/localhost.crt'));

  const app = await NestFactory.create(
    AppModule,
    development
      ? {
          bufferLogs: true,
          cors: { exposedHeaders: 'x-total-count' },
          httpsOptions: {
            key,
            cert,
          },
        }
      : {
          bufferLogs: true,
          cors: { exposedHeaders: 'x-total-count' },
        },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      forbidUnknownValues: false,
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );

  SetupSwagger(app);

  const configService = app.get(ConfigService<EnvVariables>);

  await app.listen(configService.get('PORT'));

  Logger.verbose(
    `Server URL https://${configService.get('URL')}${
      (configService.get('ENV') === 'development' &&
        `:${configService.get('PORT')}`) ||
      ''
    }`,
    'NestApplication',
  );

  Logger.verbose(
    `Api Documentation https://${configService.get('URL')}${
      (configService.get('ENV') === 'development' &&
        `:${configService.get('PORT')}`) ||
      ''
    }/api/docs`,
    'NestApplication',
  );

  Logger.verbose(
    `GraphQL Playground https://${configService.get('URL')}${
      (configService.get('ENV') === 'development' &&
        `:${configService.get('PORT')}`) ||
      ''
    }/graphql/docs`,
    'NestApplication',
  );
}
bootstrap();
