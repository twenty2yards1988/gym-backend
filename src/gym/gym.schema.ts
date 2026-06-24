import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GymDocument = Gym & Document;

@Schema()
export class Gym {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  location!: string;

  @Prop({ required: true })
  trainer!: string;

  @Prop({ required: true })
  fees!: number;
}

export const GymSchema = SchemaFactory.createForClass(Gym);
