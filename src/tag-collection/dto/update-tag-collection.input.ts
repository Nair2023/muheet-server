import { IsInt } from 'class-validator';
import { CreateTagCollectionInput } from './create-tag-collection.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTagCollectionInput extends PartialType(
  CreateTagCollectionInput,
) {
  @IsInt()
  id: number;
}
