import { IsInt } from 'class-validator';
import { CreateCategoryNoteInput } from './create-category-note.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryNoteInput extends PartialType(
  CreateCategoryNoteInput,
) {
  @IsInt()
  id: number;
}
