import { IsInt } from 'class-validator';
import { CreateCooperativeNoteInput } from './create-cooperative-note.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCooperativeNoteInput extends PartialType(
  CreateCooperativeNoteInput,
) {
  @IsInt()
  id: number;
}
