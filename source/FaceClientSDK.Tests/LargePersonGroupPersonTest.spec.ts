import { expect } from 'chai';
import { Guid } from "guid-typescript";
import { APIReference } from '../FaceClientSDK/APIReference';
import * as DomainLargePersonGroupPerson from '../FaceClientSDK/Domain/LargePersonGroupPerson/DomainLargePersonGroupPerson';

APIReference.FaceAPIKey = process.env.FACEAPI_KEY;
APIReference.FaceAPIZone = 'southcentralus';

describe('LargePersonGroupPerson', () => {
  it('AddFaceAsync', async () => {
    expect(true).to.be.true;
  });

  it('CreateAsync', async () => {
    expect(true).to.be.true;
  });

  it('DeleteAsync', async () => {
    expect(true).to.be.true;
  });

  it('DeleteFaceAsync', async () => {
    expect(true).to.be.true;
  });

  it('GetAsync', async () => {
    expect(true).to.be.true;
  });

  it('GetFaceAsync', async () => {
    expect(true).to.be.true;
  });

  it('ListAsync', async () => {
    expect(true).to.be.true;
  });

  it('UpdateAsync', async () => {
    expect(true).to.be.true;
  });

  it('UpdateFaceAsync', async () => {
    expect(true).to.be.true;
  });
});