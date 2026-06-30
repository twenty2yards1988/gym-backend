import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GymService } from './gym.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { GymQueryDto } from './dto/gym-query.dto';
import { BulkUpdateGymDto } from './dto/bulk-update-gym.dto';
import { BulkDeleteGymDto } from './dto/bulk-delete-gym.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Gym')
@ApiBearerAuth()
@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Post()
  @ApiOperation({ summary: 'Create Gym' })
  createGym(@Body() body: CreateGymDto) {
    return this.gymService.createGym(body);
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get Gym Analytics' })
  getGymAnalytics() {
    return this.gymService.getGymAnalytics();
  }

  @Get()
  @ApiOperation({
    summary:
      'Get All Gyms with lean(), select(), pagination, filtering and sorting',
  })
  getAllGyms(@Query() query: GymQueryDto) {
    return this.gymService.getAllGyms(query);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Gym using findOneAndUpdate' })
  updateGym(@Param('id') id: string, @Body() body: CreateGymDto) {
    return this.gymService.updateGym(id, body);
  }

  @Patch('bulk/update')
  @ApiOperation({ summary: 'Bulk update gyms using updateMany' })
  updateManyGyms(@Body() body: BulkUpdateGymDto) {
    return this.gymService.updateManyGyms(body.filter, body.updateData);
  }

  @Delete('bulk/delete')
  @ApiOperation({ summary: 'Bulk delete gyms using deleteMany' })
  deleteManyGyms(@Body() body: BulkDeleteGymDto) {
    return this.gymService.deleteManyGyms(body.filter);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Gym Admin Only' })
  deleteGym(@Param('id') id: string) {
    return this.gymService.deleteGym(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get Logged In User Profile' })
  getProfile(@CurrentUser() user: unknown) {
    return {
      success: true,
      user,
    };
  }
}
