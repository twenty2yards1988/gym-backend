/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGymDto {
  @ApiProperty({
    example: 'FitZone Gym',
    description: 'Name of the gym',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'Pune',
    description: 'Gym location',
  })
  @IsString()
  @IsNotEmpty()
  location!: string;

  @ApiProperty({
    example: 'Rohit',
    description: 'Trainer name',
  })
  @IsString()
  @IsNotEmpty()
  trainer!: string;

  @ApiProperty({
    example: 2500,
    description: 'Monthly fees',
  })
  @Type(() => Number)
  @IsNumber()
  fees!: number;
}
