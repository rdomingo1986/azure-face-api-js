import { AddFaceResult } from '../Domain/FaceList/AddFaceResult';
import { GetResult } from '../Domain/FaceList/GetResult';
import { ListResult } from '../Domain/FaceList/ListResult';

export interface IFaceList {
  AddFaceAsync(largeFaceListId: string, url: string, userData: string, targetFace: string): AddFaceResult;

  CreateAsync(largeFaceListId: string, name: string, userData: string): boolean;

  DeleteAsync(largeFaceListId: string): boolean;

  DeleteFaceAsync(largeFaceListId: string, persistedFaceId: string): boolean;

  GetAsync(largeFaceListId: string): GetResult;

  ListAsync(): Array<ListResult>;

  UpdateAsync(largeFaceListId: string, name: string, userData: string): boolean;
}