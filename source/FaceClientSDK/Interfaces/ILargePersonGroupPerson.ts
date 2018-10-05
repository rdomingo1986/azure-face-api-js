import * as DomainLargePersonGroupPerson from '../Domain/LargePersonGroupPerson/DomainLargePersonGroupPerson';

export interface ILargePersonGroupPerson {
  AddFaceAsync(largePersonGroupId: string, personId: string, url: string, userData: string, targetFace: string): Promise<DomainLargePersonGroupPerson.AddFaceResult>;

  CreateAsync(largePersonGroupId: string, name: string, userData: string): Promise<DomainLargePersonGroupPerson.CreateResult>;

  DeleteAsync(largePersonGroupId: string, personId: string): Promise<boolean>;

  DeleteFaceAsync(largePersonGroupId: string, personId: string, persistedFaceId: string): Promise<boolean>;

  GetAsync(largePersonGroupId: string, personId: string): Promise<DomainLargePersonGroupPerson.GetResult>;

  GetFaceAsync(largePersonGroupId: string, personId: string, persistedFaceId: string): Promise<DomainLargePersonGroupPerson.GetFaceResult>;

  ListAsync(largePersonGroupId: string, start: string, top: number): Promise<Array<DomainLargePersonGroupPerson.ListResult>>;

  UpdateAsync(largePersonGroupId: string, personId: string, name: string, userData: string ): Promise<boolean>;

  UpdateFaceAsync(largePersonGroupId: string, personId: string, persistedFaceId: string, userData: string): Promise<boolean>;
}