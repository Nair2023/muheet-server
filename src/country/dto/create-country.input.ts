import { InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateCountryInput {
  @IsString()
  name: string;
}

@InputType()
export class FilterCountryInput {
  @IsInt()
  id?: number;

  @IsString()
  name: string;
}
