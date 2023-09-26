import { IsInt } from 'class-validator';
import { CreateSystemConfigInput } from './create-system-config.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSystemConfigInput extends PartialType(
  CreateSystemConfigInput,
) {
  @IsInt()
  id: number;
}
