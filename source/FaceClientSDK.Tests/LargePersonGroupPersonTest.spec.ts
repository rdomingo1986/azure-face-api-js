import { expect } from 'chai';
import { Guid } from "guid-typescript";
import { APIReference } from '../FaceClientSDK/APIReference';
import * as DomainLargePersonGroupPerson from '../FaceClientSDK/Domain/LargePersonGroupPerson/DomainLargePersonGroupPerson';

APIReference.FaceAPIKey = '0328672ce40b421f8b2ec53b76101b19';
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