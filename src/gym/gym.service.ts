import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateQuery } from 'mongoose';
import { Gym, GymDocument } from './gym.schema';

@Injectable()
export class GymService {
  constructor(
    @InjectModel(Gym.name)
    private readonly gymModel: Model<GymDocument>,
  ) {}

  async createGym(gymData: Partial<Gym>) {
    const newGym = new this.gymModel(gymData);
    return newGym.save();
  }

  async getAllGyms() {
    return this.gymModel.find();
  }

  async updateGym(id: string, gymData: UpdateQuery<GymDocument>) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid Gym ID');
    }

    const updatedGym = await this.gymModel.findByIdAndUpdate(id, gymData, {
      new: true,
    });

    if (!updatedGym) {
      throw new NotFoundException('Gym not found');
    }

    return updatedGym;
  }

  async deleteGym(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid Gym ID');
    }

    const deletedGym = await this.gymModel.findByIdAndDelete(id);

    if (!deletedGym) {
      throw new NotFoundException('Gym not found');
    }

    return {
      message: 'Gym deleted successfully',
    };
  }
}
