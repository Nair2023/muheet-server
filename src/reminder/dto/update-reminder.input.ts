import { IsInt } from 'class-validator';
import { CreateReminderInput } from './create-reminder.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReminderInput extends PartialType(CreateReminderInput) {
  @IsInt()
  id: number;
}
