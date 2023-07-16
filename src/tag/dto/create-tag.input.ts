import { InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateTagInput {
  @IsString()
  name: string;

  @IsInt()
  account_id?: number;

  @IsInt()
  company_id?: number;
}

@InputType()
export class FilterTagInput {
  @IsInt()
  id?: number;

  @IsString()
  name?: string;

  @IsInt()
  account_id?: number;

  @IsInt()
  company_id?: number;
}
