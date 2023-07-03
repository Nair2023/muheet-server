import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import dayjs from 'dayjs';
import { resolve } from 'path';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Logging Interceptor
 * A custom interceptor that allows the app to override the built in NestJS Logger
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  /**
   *A method that creates a new log file if it hasn't been created yet and returns its path
   *
   * @return {string} returns a string representing the log file path
   */
  getOrCreateTodayLogFile(operation_name: string): string {
    const file_name = `${operation_name}-log-${dayjs().format(
      'DD-MM-YYYY',
    )}.log`;
    return resolve('logs', file_name);
  }

  /**
   *A method that formats the logged message after receiving type, message and context inputs
   *and returns a formatted message
   * @param {string} type input for type
   * @param {string} message input for message
   * @param {string} [context] input for context
   * @return {string}  returns a formatted message
   */
  format(type: string, message: string, context?: string): string {
    const timestamp = `${dayjs().format('DD-MM-YYYY HH:mm:ss.SSS')}`;
    return `${type}\t${timestamp}\t[${context}]\t${message}\n`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const restCtx = context.getArgs()[0];
      const rest_type = restCtx.method;
      const rest_args = restCtx.body;
      const rest_operation = context.getHandler().name;

      this.logger.log(
        `${rest_type}: ${rest_operation} ${JSON.stringify(rest_args)}`,
        'Audit: REST Request',
      );

      return next.handle().pipe(
        tap((res) => {
          this.logger.log(
            `${rest_type}: ${rest_operation} ${JSON.stringify(res)}`,
            'Audit: REST Response',
          );
        }),
      );
    }

    const gqlCtx = GqlExecutionContext.create(context);
    const gql_type = gqlCtx.getInfo().path.typename;
    const gql_operation = gqlCtx.getInfo().path.key;
    const gql_args = gqlCtx.getArgs();

    this.logger.log(
      `${gql_type}: ${gql_operation} ${JSON.stringify(gql_args)}`,
      'Audit: GraphQL Request',
    );

    return next.handle().pipe(
      tap((res) => {
        if (!(res?.eventsArray?.length > 0)) {
          this.logger.log(
            `${gql_type}: ${gql_operation} ${JSON.stringify(res)}`,
            'Audit: GraphQL Response',
          );
        } else {
          this.logger.log(
            `${gql_type}: ${res.eventsArray[0]}`,
            'Audit: GraphQL Response',
          );
        }
      }),
    );
  }
}
