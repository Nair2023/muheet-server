import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// TODO: Test this
@Injectable()
export class APIKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { API_KEY, ENV } = process.env;

    if (ENV !== 'development') {
      if (context.getType() === 'http') {
        const request = context.switchToHttp().getRequest();

        return (
          request?.headers?.api_key === API_KEY ||
          request?.headers?.API_KEY === API_KEY ||
          request?.headers['x-api-key'] === API_KEY ||
          request?.headers['X-API-KEY'] === API_KEY
        );
      }

      const ctx = GqlExecutionContext.create(context);
      return (
        ctx.getContext()?.req?.headers?.api_key === API_KEY ||
        ctx.getContext()?.req?.headers?.API_KEY
      );
    }

    return true;
  }
}
