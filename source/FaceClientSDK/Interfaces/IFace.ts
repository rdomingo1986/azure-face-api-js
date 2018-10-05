import * as DomainFace from '../Domain/Face/DomainFace';

export interface IFace {
  DetectAsync(url: string, returnFaceAttributes: string, returnFaceId: boolean, returnFaceLandmarks: boolean): Promise<Array<DomainFace.DetectResult>>; // returnFaceId: boolean = false, returnFaceLandmarks: boolean = false

  FindSimilarAsync(faceId: string, faceListId: string, largeFaceListId: string, faceIds: Array<string>, maxNumOfCandidatesReturned: Array<Number>, mode: string): Promise<Array<DomainFace.FindSimilarResult>>;

  VerifyAsync(faceId1: string, faceId2: string, faceId: string, personGroupId: string, largePersonGroupId: string, personId: string): Promise<DomainFace.VerifyResult>;
}