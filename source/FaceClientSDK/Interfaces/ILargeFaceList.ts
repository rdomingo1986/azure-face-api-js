import * as DomainLargeFaceList from '../Domain/LargeFaceList/DomainLargeFaceList';

export interface ILargeFaceList {
  AddFaceAsync(largeFaceListId: string, url: string, userData: string, targetFace: string): Promise<DomainLargeFaceList.AddFaceResult>;

  CreateAsync(largeFaceListId: string, name: string, userData: string): Promise<boolean>;

  DeleteAsync(largeFaceListId: string): Promise<boolean>;

  DeleteFaceAsync(largeFaceListId: string, persistedFaceId: string): Promise<boolean>;

  GetAsync(largeFaceListId: string): Promise<DomainLargeFaceList.GetResult>;

  GetFaceAsync(largeFaceListId: string, persistedFaceId: string): Promise<DomainLargeFaceList.GetFaceResult>;

  GetTrainingStatusAsync(largeFaceListId: string): Promise<DomainLargeFaceList.GetTrainingStatusResult>;

  ListAsync(start: string, top: number): Promise<Array<DomainLargeFaceList.ListResult>>;

  ListFaceAsync(largeFaceListId: string): Promise<Array<DomainLargeFaceList.ListFaceResult>>;

  TrainAsync(largeFaceListId: string): Promise<boolean>;

  UpdateAsync(largeFaceListId: string, name: string, userData: string): Promise<boolean>;

  UpdateFaceAsync(largeFaceListId: string, persistedFaceId: string, userData: string): Promise<boolean>;
}