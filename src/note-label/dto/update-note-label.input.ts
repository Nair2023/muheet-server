import { IsInt } from 'class-validator';
import { CreateNoteLabelInput } from './create-note-label.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNoteLabelInput extends PartialType(CreateNoteLabelInput) {
  @IsInt()
  id: number;
}
