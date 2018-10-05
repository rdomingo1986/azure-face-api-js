import * as DomainLargePersonGroup from '../Domain/LargePersonGroup/DomainLargePersonGroup';

export interface ILargePersonGroup {
  CreateAsync(largePersonGroupId: string, name: string, userData: string): Promise<boolean>;

  DeleteAsync(largePersonGroupId: string): Promise<boolean>;

  GetAsync(largePersonGroupId: string): Promise<DomainLargePersonGroup.GetResult>;

  GetTrainingStatusAsync(largePersonGroupId: string): Promise<DomainLargePersonGroup.GetTrainingStatusResult>;

  ListAsync(start: string, top: number): Promise<Array<DomainLargePersonGroup.ListResult>>;

  TrainAsync(largePersonGroupId: string): Promise<boolean>;

  UpdateAsync(largePersonGroupId: string, name: string, userData: string): Promise<boolean>;
}