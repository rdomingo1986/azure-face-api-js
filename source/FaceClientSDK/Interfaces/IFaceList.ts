import { AddFaceResult } from '../Domain/FaceList/AddFaceResult';
import { GetResult } from '../Domain/FaceList/GetResult';
import { ListResult } from '../Domain/FaceList/ListResult';

export interface IFaceList {
  AddFaceAsync(faceListId: string, url: string, userData: string, targetFace: string): Promise<AddFaceResult>;

  CreateAsync(faceListId: string, name: string, userData: string): Promise<boolean>;

  DeleteAsync(faceListId: string): Promise<boolean>;

  DeleteFaceAsync(faceListId: string, persistedFaceId: string): Promise<boolean>;

  GetAsync(faceListId: string): Promise<GetResult>;

  ListAsync(): Promise<Array<ListResult>>;

  UpdateAsync(faceListId: string, name: string, userData: string): Promise<boolean>;
}