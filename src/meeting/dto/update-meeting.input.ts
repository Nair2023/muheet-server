import { IsInt } from 'class-validator';
import { CreateMeetingInput } from './create-meeting.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMeetingInput extends PartialType(CreateMeetingInput) {
  @IsInt()
  id: number;
}
