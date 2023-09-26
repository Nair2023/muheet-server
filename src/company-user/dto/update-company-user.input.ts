import { IsInt } from 'class-validator';
import { CreateCompanyUserInput } from './create-company-user.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyUserInput extends PartialType(
  CreateCompanyUserInput,
) {
  @IsInt()
  id: number;
}
