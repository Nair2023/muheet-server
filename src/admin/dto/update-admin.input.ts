import { IsInt } from 'class-validator';
import { CreateAdminInput } from './create-admin.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  @IsInt()
  id: number;
}
