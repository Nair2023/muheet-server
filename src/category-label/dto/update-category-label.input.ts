import { IsInt } from 'class-validator';
import { CreateCategoryLabelInput } from './create-category-label.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryLabelInput extends PartialType(
  CreateCategoryLabelInput,
) {
  @IsInt()
  id: number;
}
