import { expect } from 'chai';
import { Guid } from "guid-typescript";
import { APIReference } from '../FaceClientSDK/APIReference';
import * as DomainFaceList from '../FaceClientSDK/Domain/FaceList/DomainFaceList';

APIReference.FaceAPIKey = '4e032a4875ff4bb08853aad50d8b0340';
APIReference.FaceAPIZone = 'southcentralus';

describe('FaceList', () => {
  it('AddFaceAsync', async () => {
    let result: DomainFaceList.AddFaceResult = null;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.FaceList.CreateAsync(identifier, identifier, identifier)) {
        let userData: Object = new Object();
        userData['userDataSample'] = "User Data Sample";
        let testImageUrl: string = 'https://rdomingo1986.blob.core.windows.net/faceapitests/37357230_10155893037032858_4970212631118872576_n.jpg';
        result = await APIReference.Instance.FaceList.AddFaceAsync(identifier, testImageUrl, JSON.stringify(userData), '');
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.FaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('CreateAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      result = await APIReference.Instance.FaceList.CreateAsync(identifier, identifier, identifier);
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.FaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.true;
  });

  it('DeleteAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.FaceList.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.FaceList.DeleteAsync(identifier);
      }
    } catch(error) {
      throw new Error(error);
    }
    expect(result).to.be.true;
  });

  it('DeleteFaceAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      let addFaceResult: DomainFaceList.AddFaceResult = null;
      if(await APIReference.Instance.FaceList.CreateAsync(identifier, identifier, identifier)) {
        let userData: Object = new Object();
        userData['userDataSample'] = "User Data Sample";
        let testImageUrl: string = 'https://rdomingo1986.blob.core.windows.net/faceapitests/37357230_10155893037032858_4970212631118872576_n.jpg';
        addFaceResult = await APIReference.Instance.FaceList.AddFaceAsync(identifier, testImageUrl, JSON.stringify(userData), '');
        if(addFaceResult != null) {
          result = await APIReference.Instance.FaceList.DeleteFaceAsync(identifier, addFaceResult.persistedFaceId);
        }
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.FaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.true;
  });

  it('GetAsync', async () => {
    let result: DomainFaceList.GetResult = null;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.FaceList.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.FaceList.GetAsync(identifier);
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.FaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('ListAsync', async () => {
    let result: Array<DomainFaceList.ListResult> = null;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.FaceList.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.FaceList.ListAsync();
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.FaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('UpdateAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.FaceList.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.FaceList.UpdateAsync(identifier, "Name", "User Data Sample");
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.FaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.true;
  });
});