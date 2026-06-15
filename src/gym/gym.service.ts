import { Injectable } from '@nestjs/common';

interface Gym {
  id: number;
  name: string;
  location: string;
  trainer: string;
}

type CreateGymDto = Omit<Gym, 'id'>;

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

  getGymById(id: number): { message: string; data: Gym | null } {
    console.log('Route parameter received:', id);

    const gym = this.gyms.find((gymItem) => gymItem.id === id);

    return {
      message: gym ? 'Gym fetched successfully' : 'Gym not found',
      data: gym ?? null,
    };
  }
}