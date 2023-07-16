import { InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateCityInput {
  @IsString()
  name: string;

  @IsInt()
  country_id: number;
}

@InputType()
export class FilterCityInput {
  @IsInt()
  id?: number;

  @IsString()
  name?: string;

  @IsInt()
  country_id?: number;
}
