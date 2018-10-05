import * as DomainFaceList from '../Domain/FaceList/DomainFaceList';

export interface IFaceList {
  AddFaceAsync(faceListId: string, url: string, userData: string, targetFace: string): Promise<DomainFaceList.AddFaceResult>;

  CreateAsync(faceListId: string, name: string, userData: string): Promise<boolean>;

  DeleteAsync(faceListId: string): Promise<boolean>;

  DeleteFaceAsync(faceListId: string, persistedFaceId: string): Promise<boolean>;

  GetAsync(faceListId: string): Promise<DomainFaceList.GetResult>;

  ListAsync(): Promise<Array<DomainFaceList.ListResult>>;

  UpdateAsync(faceListId: string, name: string, userData: string): Promise<boolean>;
}