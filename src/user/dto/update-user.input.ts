import { IsInt } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsInt()
  id: number;
}
