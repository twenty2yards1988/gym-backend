import { ApiPropertyOptional } from '@nestjs/swagger';

export class GymQueryDto {
  @ApiPropertyOptional({ example: 1 })
  page?: string;

  @ApiPropertyOptional({ example: 10 })
  limit?: string;

  @ApiPropertyOptional({ example: 'Pune' })
  location?: string;

  @ApiPropertyOptional({ example: 'Rohit' })
  trainer?: string;

  @ApiPropertyOptional({ example: 'fees' })
  sort?: string;
}
