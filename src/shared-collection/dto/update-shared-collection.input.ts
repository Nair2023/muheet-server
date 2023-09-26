import { IsInt } from 'class-validator';
import { CreateSharedCollectionInput } from './create-shared-collection.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSharedCollectionInput extends PartialType(
  CreateSharedCollectionInput,
) {
  @IsInt()
  id: number;
}
