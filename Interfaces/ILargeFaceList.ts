import { AddFaceResult } from '../Domain/LargeFaceList/AddFaceResult';
import { GetResult } from '../Domain/LargeFaceList/GetResult';
import { GetFaceResult } from '../Domain/LargeFaceList/GetFaceResult';
import { GetTrainingStatusResult } from '../Domain/LargeFaceList/GetTrainingStatusResult';
import { ListResult } from '../Domain/LargeFaceList/ListResult';
import { ListFaceResult } from '../Domain/LargeFaceList/ListFaceResult';

export interface ILargeFaceList {
  AddFaceAsync(largeFaceListId: string, url: string, userData: string, targetFace: string): AddFaceResult;

  CreateAsync(largeFaceListId: string, name: string, userData: string): boolean;

  DeleteAsync(largeFaceListId: string): boolean;

  DeleteFaceAsync(largeFaceListId: string, persistedFaceId: string): boolean;

  GetAsync(largeFaceListId: string): GetResult;

  GetFaceAsync(largeFaceListId: string, persistedFaceId: string): GetFaceResult;

  GetTrainingStatusAsync(largeFaceListId: string): GetTrainingStatusResult;

  ListAsync(start: string, top: number): Array<ListResult>;

  ListFaceAsync(largeFaceListId: string): Array<ListFaceResult>;

  TrainAsync(largeFaceListId: string): boolean;

  UpdateAsync(largeFaceListId: string, name: string, userData: string): boolean;

  UpdateFaceAsync(largeFaceListId: string, persistedFaceId: string, userData: string): boolean;
}