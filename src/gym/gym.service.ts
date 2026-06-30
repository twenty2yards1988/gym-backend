import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateQuery } from 'mongoose';
import { Gym, GymDocument } from './gym.schema';
import { GymQueryDto } from './dto/gym-query.dto';

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

  async getGymAnalytics() {
    const totalGyms = await this.gymModel.countDocuments();

    const analytics = await this.gymModel.aggregate([
      {
        $group: {
          _id: null,
          averageFees: { $avg: '$fees' },
          highestFees: { $max: '$fees' },
          lowestFees: { $min: '$fees' },
        },
      },
    ]);

    return {
      success: true,
      message: 'Gym analytics fetched successfully',
      data: {
        totalGyms,
        averageFees: analytics[0]?.averageFees || 0,
        highestFees: analytics[0]?.highestFees || 0,
        lowestFees: analytics[0]?.lowestFees || 0,
      },
    };
  }

  async getAllGyms(query: GymQueryDto) {
    console.time('GET_ALL_GYMS_QUERY_TIME');

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, string> = {};

    if (query.location) {
      filter.location = query.location;
    }

    if (query.trainer) {
      filter.trainer = query.trainer;
    }

    const sortOption: Record<string, 1 | -1> = {};

    if (query.sort) {
      if (query.sort.startsWith('-')) {
        sortOption[query.sort.substring(1)] = -1;
      } else {
        sortOption[query.sort] = 1;
      }
    }

    const data = await this.gymModel
      .find(filter)
      .select('name location trainer fees createdAt updatedAt')
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await this.gymModel.countDocuments(filter);

    console.timeEnd('GET_ALL_GYMS_QUERY_TIME');

    return {
      success: true,
      message: 'Gyms fetched successfully',
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateGym(id: string, gymData: UpdateQuery<GymDocument>) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid Gym ID');
    }

    const updatedGym = await this.gymModel.findOneAndUpdate(
      { _id: id },
      gymData,
      {
        new: true,
      },
    );

    if (!updatedGym) {
      throw new NotFoundException('Gym not found');
    }

    return {
      success: true,
      message: 'Gym updated successfully using findOneAndUpdate',
      data: updatedGym,
    };
  }

  async updateManyGyms(filter: Record<string, string>, updateData: Partial<Gym>) {
    const result = await this.gymModel.updateMany(filter, {
      $set: updateData,
    });

    return {
      success: true,
      message: 'Gyms updated successfully using updateMany',
      data: result,
    };
  }

  async deleteManyGyms(filter: Record<string, string>) {
    const result = await this.gymModel.deleteMany(filter);

    return {
      success: true,
      message: 'Gyms deleted successfully using deleteMany',
      data: result,
    };
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
