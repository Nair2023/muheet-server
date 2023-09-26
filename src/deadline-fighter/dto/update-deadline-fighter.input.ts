import { IsInt } from 'class-validator';
import { CreateDeadlineFighterInput } from './create-deadline-fighter.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDeadlineFighterInput extends PartialType(
  CreateDeadlineFighterInput,
) {
  @IsInt()
  id: number;
}
