import { IsString, MinLength } from 'class-validator';

export class CreateCarsSandboxDto {
  @IsString()
  readonly brand: string;
  @IsString()
  @MinLength(3)
  readonly model: string;
}
