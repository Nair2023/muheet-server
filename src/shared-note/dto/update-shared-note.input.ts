import { IsInt } from 'class-validator';
import { CreateSharedNoteInput } from './create-shared-note.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSharedNoteInput extends PartialType(CreateSharedNoteInput) {
  @IsInt()
  id: number;
}
