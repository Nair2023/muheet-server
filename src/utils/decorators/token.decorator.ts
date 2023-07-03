import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// TODO: Test this
export const CurrentToken = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();

      return request.headers.authorization;
    }

    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.headers.authorization;
  },
);
