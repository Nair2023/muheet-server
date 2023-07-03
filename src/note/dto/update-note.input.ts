import { IsInt } from 'class-validator';
import { CreateNoteInput } from './create-note.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNoteInput extends PartialType(CreateNoteInput) {
  @IsInt()
  id: number;
}
