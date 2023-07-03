import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@InputType()
export class CreateNoteInput {
  @IsString()
  title?: string;

  @IsString()
  body: string;

  @IsInt()
  account_id: number;

  @IsInt()
  collection_id?: number;

  @IsBoolean()
  checked?: boolean;

  @IsBoolean()
  cooperative?: boolean;

  @IsBoolean()
  shared?: boolean;

  @IsBoolean()
  checkable?: boolean;
}
