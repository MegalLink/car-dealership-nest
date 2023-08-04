import { PartialType } from '@nestjs/mapped-types';
import { CreateCarsSandboxDto } from './create-cars_sandbox.dto';
import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class UpdateCarsSandboxDto extends PartialType(CreateCarsSandboxDto) {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id: string;

  @MinLength(3)
  @IsOptional()
  readonly model?: string;
}
