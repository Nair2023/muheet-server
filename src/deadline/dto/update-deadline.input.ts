import { IsInt } from 'class-validator';
import { CreateDeadlineInput } from './create-deadline.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDeadlineInput extends PartialType(CreateDeadlineInput) {
  @IsInt()
  id: number;
}
