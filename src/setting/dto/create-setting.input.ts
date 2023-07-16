import { InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class CreateSettingInput {
  @IsInt()
  account_id?: number;

  @IsInt()
  company_id?: number;
}

@InputType()
export class FilterSettingInput {
  @IsInt()
  id?: number;

  @IsInt()
  account_id?: number;

  @IsInt()
  company_id?: number;
}
