import { IsInt } from 'class-validator';
import { CreateDeviceInput } from './create-device.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDeviceInput extends PartialType(CreateDeviceInput) {
  @IsInt()
  id: number;
}
