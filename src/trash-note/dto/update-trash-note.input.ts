import { IsInt } from 'class-validator';
import { CreateTrashNoteInput } from './create-trash-note.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTrashNoteInput extends PartialType(CreateTrashNoteInput) {
  @IsInt()
  id: number;
}
