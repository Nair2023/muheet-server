import { IsInt } from 'class-validator';
import { CreateCompanyClientInput } from './create-company-client.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyClientInput extends PartialType(
  CreateCompanyClientInput,
) {
  @IsInt()
  id: number;
}
