import { IsInt } from 'class-validator';
import { CreateCollectionInput } from './create-collection.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCollectionInput extends PartialType(CreateCollectionInput) {
  @IsInt()
  id: number;
}
