import { expect } from 'chai';
import { Guid } from "guid-typescript";
import { APIReference } from '../FaceClientSDK/APIReference';
import * as DomainFace from '../FaceClientSDK/Domain/Face/DomainFace';

APIReference.FaceAPIKey = '4e032a4875ff4bb08853aad50d8b0340';
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