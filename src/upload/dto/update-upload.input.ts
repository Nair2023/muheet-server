import { IsInt } from 'class-validator';
import { CreateUploadInput } from './create-upload.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUploadInput extends PartialType(CreateUploadInput) {
  @IsInt()
  id: number;
}
