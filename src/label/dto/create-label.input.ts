import { InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateLabelInput {
  @IsString()
  name: string;

  @IsInt()
  account_id?: number;

  @IsInt()
  company_id?: number;
}

@InputType()
export class FilterLabelInput {
  @IsInt()
  id?: number;

  @IsString()
  name?: string;

  @IsInt()
  account_id?: number;

  @IsInt()
  company_id?: number;
}
