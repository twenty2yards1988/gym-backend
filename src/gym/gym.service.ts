import { Injectable } from '@nestjs/common';
import { CreateGymDto } from './dto/create-gym.dto';

export interface Gym {
  id: number;
  name: string;
  location: string;
  trainer: string;
}

@Injectable()
export class GymService {
  private gyms: Gym[] = [
    {
      id: 1,
      name: 'FitZone Gym',
      location: 'Pune',
      trainer: 'Rohit',
    },
    {
      id: 2,
      name: 'PowerHouse Gym',
      location: 'Mumbai',
      trainer: 'Amit',
    },
  ];

  getAllGyms(): { message: string; data: Gym[] } {
    return {
      message: 'Gyms fetched successfully',
      data: this.gyms,
    };
  }

  getGymById(id: number): { message: string; data: Gym | null } {
    console.log('Route parameter received:', id);

    const gym = this.gyms.find((gymItem) => gymItem.id === id);

    if (!gym) {
      return {
        message: 'Gym not found',
        data: null,
      };
    }

    return {
      message: 'Gym fetched successfully',
      data: gym,
    };
  }

  addGym(gymData: CreateGymDto): { message: string; data: Gym } {
    console.log('Request body received:', gymData);

    const newGym: Gym = {
      id: this.gyms.length + 1,
      name: gymData.name,
      location: gymData.location,
      trainer: gymData.trainer,
    };

    this.gyms.push(newGym);

    return {
      message: 'Gym added successfully',
      data: newGym,
    };
  }
}
