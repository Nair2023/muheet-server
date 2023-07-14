import { IsInt } from 'class-validator';
import { CreateCompanyInput } from './create-company.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @IsInt()
  id: number;
}
