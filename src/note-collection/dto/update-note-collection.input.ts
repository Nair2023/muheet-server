import { IsInt } from 'class-validator';
import { CreateNoteCollectionInput } from './create-note-collection.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNoteCollectionInput extends PartialType(
  CreateNoteCollectionInput,
) {
  @IsInt()
  id: number;
}
