import { IsInt } from 'class-validator';
import { CreateCategoryInput } from './create-category.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @IsInt()
  id: number;
}
