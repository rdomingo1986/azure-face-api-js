import { DetectResult } from '../Domain/Face/DetectResult';
import { FindSimilarResult} from '../Domain/Face/FindSimilarResult';
import { VerifyResult } from '../Domain/Face/VerifyResult';

export interface IFace {
  DetectAsync(url: string, returnFaceAttributes: string, returnFaceId: boolean, returnFaceLandmarks: boolean): Array<DetectResult>; // returnFaceId: boolean = false, returnFaceLandmarks: boolean = false

  FindSimilarAsync(faceId: string, faceListId: string, largeFaceListId: string, faceIds: Array<string>, maxNumOfCandidatesReturned: Array<Number>, mode: string): Array<FindSimilarResult>;

  VerifyAsync(faceId1: string, faceId2: string, faceId: string, personGroupId: string, largePersonGroupId: string, personId: string): VerifyResult;
}