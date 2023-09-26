import { IsInt } from 'class-validator';
import { CreateClientInput } from './create-client.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
  @IsInt()
  id: number;
}
