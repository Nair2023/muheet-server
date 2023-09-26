import { IsInt } from 'class-validator';
import { CreateSystemConfigUploadInput } from './create-system-config-upload.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSystemConfigUploadInput extends PartialType(
  CreateSystemConfigUploadInput,
) {
  @IsInt()
  id: number;
}
