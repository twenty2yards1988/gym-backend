/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateGymDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  trainer?: string;
}
