import { IsInt } from 'class-validator';
import { CreateArchiveInput } from './create-archive.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateArchiveInput extends PartialType(CreateArchiveInput) {
  @IsInt()
  id: number;
}
