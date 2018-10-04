import { AddFaceResult } from '../Domain/LargePersonGroupPerson/AddFaceResult';
import { CreateResult } from '../Domain/LargePersonGroupPerson/CreateResult';
import { GetResult } from '../Domain/LargePersonGroupPerson/GetResult';
import { GetFaceResult } from '../Domain/LargePersonGroupPerson/GetFaceResult';
import { ListResult } from '../Domain/LargePersonGroupPerson/ListResult';

export interface ILargePersonGroupPerson {
  AddFaceAsync(largePersonGroupId: string, personId: string, url: string, userData: string, targetFace: string): AddFaceResult;

  CreateAsync(largePersonGroupId: string, name: string, userData: string): CreateResult;

  DeleteAsync(largePersonGroupId: string, personId: string): boolean;

  DeleteFaceAsync(largePersonGroupId: string, personId: string, persistedFaceId: string): boolean;

  GetAsync(largePersonGroupId: string, personId: string): GetResult;

  GetFaceAsync(largePersonGroupId: string, personId: string, persistedFaceId: string): GetFaceResult;

  ListAsync(largePersonGroupId: string, start: string, top: number): Array<ListResult>;

  UpdateAsync(largePersonGroupId: string, personId: string, name: string, userData: string ): boolean;

  UpdateFaceAsync(largePersonGroupId: string, personId: string, persistedFaceId: string, userData: string): boolean;
}