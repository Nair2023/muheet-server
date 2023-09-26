import { IsInt } from 'class-validator';
import { CreateCooperativeCollectionInput } from './create-cooperative-collection.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCooperativeCollectionInput extends PartialType(
  CreateCooperativeCollectionInput,
) {
  @IsInt()
  id: number;
}
