import { IsInt } from 'class-validator';
import { CreateSettingInput } from './create-setting.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSettingInput extends PartialType(CreateSettingInput) {
  @IsInt()
  id: number;
}
