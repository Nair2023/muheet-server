import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ErrorsEnum } from '../enums/errors.enum';

export const CurrentDevice = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      if (!request.headers.device_id) {
        throw new Error(ErrorsEnum.device_not_found);
      }

      return request.headers.device_id;
    }

    const ctx = GqlExecutionContext.create(context);

    if (!ctx.getContext().req.headers.device_id) {
      throw new Error(ErrorsEnum.device_not_found);
    }

    return Number(ctx.getContext().req.headers.device_id);
  },
);
