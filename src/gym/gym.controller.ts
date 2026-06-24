import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GymService } from './gym.service';

@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Post()
  createGym(@Body() body: any) {
    return this.gymService.createGym(body);
  }

  @Get()
  getAllGyms() {
    return this.gymService.getAllGyms();
  }

  @Put(':id')
  updateGym(@Param('id') id: string, @Body() body: any) {
    return this.gymService.updateGym(id, body);
  }

  @Delete(':id')
  deleteGym(@Param('id') id: string) {
    return this.gymService.deleteGym(id);
  }
}
