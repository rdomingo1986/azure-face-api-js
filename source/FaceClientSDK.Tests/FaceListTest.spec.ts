import { expect } from 'chai';
import { Guid } from "guid-typescript";
import { APIReference } from '../FaceClientSDK/APIReference';
import * as DomainFaceList from '../FaceClientSDK/Domain/FaceList/DomainFaceList';

describe('FaceList', () => {
  it('AddFaceAsync', async () => {
    let result: DomainFaceList.AddFaceResult = null;
    let identifier: string = Guid.create().toString();

    APIReference.FaceAPIKey = '0328672ce40b421f8b2ec53b76101b19';
    APIReference.FaceAPIZone = 'southcentralus';

    try {
      let creationResult = await APIReference.Instance.FaceList.CreateAsync(identifier, identifier, identifier);

      if(creationResult) {
        let userData = new Object();
        userData['userDataaSample'] = "User Data Sample";
        let testImageUrl: string = 'https://rdomingo1986.blob.core.windows.net/faceapitests/25158438_10155380723572858_2206683014845430559_n.jpg';
        result = await APIReference.Instance.FaceList.AddFaceAsync(identifier, testImageUrl, JSON.stringify(userData), '');
      }
    } catch {
      throw new Error('FaceList.AddFaceAsync');
    } finally {
      await APIReference.Instance.FaceList.DeleteAsync(identifier);
    }

    expect(result).to.be.not.eq(null);
  });
});