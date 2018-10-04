import { GetResult } from '../Domain/LargePersonGroup/GetResult';
import { GetTrainingStatusResult } from '../Domain/LargePersonGroup/GetTrainingStatusResult';
import { ListResult } from '../Domain/LargePersonGroup/ListResult';

export interface ILargePersonGroup {
  CreateAsync(largePersonGroupId: string, name: string, userData: string): boolean;

  DeleteAsync(largePersonGroupId: string): boolean;

  GetAsync(largePersonGroupId: string): GetResult;

  GetTrainingStatusAsync(largePersonGroupId: string): GetTrainingStatusResult;

  ListAsync(start: string, top: number): Array<ListResult>;

  TrainAsync(largePersonGroupId: string): boolean;

  UpdateAsync(largePersonGroupId: string, name: string, userData: string): boolean;
}