import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GymService } from './gym.service';

interface Gym {
  id: number;
  name: string;
  location: string;
  trainer: string;
}

interface CreateGymDto {
  name: string;
  location: string;
  trainer: string;
}

@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Get()
  getAllGyms(): { message: string; data: Gym[] } {
    return this.gymService.getAllGyms();
  }

  @Get(':id')
  getGymById(@Param('id') id: string): { message: string; data: Gym | null } {
    return this.gymService.getGymById(Number(id));
  }

  @Post()
  addGym(@Body() gymData: CreateGymDto): { message: string; data: Gym } {
    return this.gymService.addGym(gymData);
  }
}