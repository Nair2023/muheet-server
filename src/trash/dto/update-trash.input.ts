import { IsInt } from 'class-validator';
import { CreateTrashInput } from './create-trash.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTrashInput extends PartialType(CreateTrashInput) {
  @IsInt()
  id: number;
}
