import { CreateGymDto } from './create-gym.dto';

export class BulkUpdateGymDto {
  filter!: Record<string, string>;

  updateData!: Partial<CreateGymDto>;
}
