import { IsInt } from 'class-validator';
import { CreateLabelInput } from './create-label.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLabelInput extends PartialType(CreateLabelInput) {
  @IsInt()
  id: number;
}
