import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// TODO: Test this
export const CurrentAccount = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest().user;
    }

    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user;
  },
);
