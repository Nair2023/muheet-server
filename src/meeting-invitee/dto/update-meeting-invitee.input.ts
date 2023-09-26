import { IsInt } from 'class-validator';
import { CreateMeetingInviteeInput } from './create-meeting-invitee.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMeetingInviteeInput extends PartialType(
  CreateMeetingInviteeInput,
) {
  @IsInt()
  id: number;
}
