import { IsInt } from 'class-validator';
import { CreateTagInput } from './create-tag.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @IsInt()
  id: number;
}
