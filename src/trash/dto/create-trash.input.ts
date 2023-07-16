import { InputType } from '@nestjs/graphql';
import { IsInt, IsBoolean } from 'class-validator';

@InputType()
export class CreateTrashInput {
  @IsBoolean()
  is_empty: boolean;

  @IsInt()
  account_id?: number;

  @IsInt()
  company_id?: number;
}

@InputType()
export class FilterTrashInput {
  @IsInt()
  id?: number;

  @IsBoolean()
  is_empty?: boolean;

  @IsInt()
  account_id?: number;

  @IsInt()
  company_id?: number;
}
