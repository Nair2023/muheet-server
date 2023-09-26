import { IsInt } from 'class-validator';
import { CreateTrashUploadInput } from './create-trash-upload.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTrashUploadInput extends PartialType(
  CreateTrashUploadInput,
) {
  @IsInt()
  id: number;
}
