import { IsInt } from 'class-validator';
import { CreateNoteUploadInput } from './create-note-upload.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNoteUploadInput extends PartialType(CreateNoteUploadInput) {
  @IsInt()
  id: number;
}
