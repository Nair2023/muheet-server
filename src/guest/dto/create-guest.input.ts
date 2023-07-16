import { InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateGuestInput {
  @IsString()
  name: string;

  @IsInt()
  upload_id?: number;
}

@InputType()
export class FilterGuestInput {
  @IsInt()
  id?: number;

  @IsString()
  name?: string;

  @IsInt()
  upload_id?: number;
}
