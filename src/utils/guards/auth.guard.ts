import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

//TODO: Test this
@Injectable()
export class CustomAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRequest<T = any>(context: ExecutionContext): T {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest<T>();
    }
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
