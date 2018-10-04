import { AddFaceResult, GetResult, ListResult } from '../Domain/FaceList/DomainFaceList';

export interface IFaceList {
  AddFaceAsync(faceListId: string, url: string, userData: string, targetFace: string): Promise<AddFaceResult>;

  CreateAsync(faceListId: string, name: string, userData: string): Promise<boolean>;

  DeleteAsync(faceListId: string): Promise<boolean>;

  DeleteFaceAsync(faceListId: string, persistedFaceId: string): Promise<boolean>;

  GetAsync(faceListId: string): Promise<GetResult>;

  ListAsync(): Promise<Array<ListResult>>;

  UpdateAsync(faceListId: string, name: string, userData: string): Promise<boolean>;
}