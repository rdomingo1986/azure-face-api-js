import { expect } from 'chai';
import { Guid } from "guid-typescript";
import { APIReference } from '../FaceClientSDK/APIReference';
import * as DomainFace from '../FaceClientSDK/Domain/Face/DomainFace';

APIReference.FaceAPIKey = '0328672ce40b421f8b2ec53b76101b19';
APIReference.FaceAPIZone = 'southcentralus';

describe('Face', () => {
  it('DetectAsync', async () => {
    expect(true).to.be.true;
  });

  it('FindSimilarAsync', async () => {
    expect(true).to.be.true;
  });

  it('VerifyAsync', async () => {
    expect(true).to.be.true;
  });
});