import { expect } from 'chai';
import { Guid } from "guid-typescript";
import { msleep } from 'sleep';
import { APIReference } from '../FaceClientSDK/APIReference';
import * as DomainLargeFaceList from '../FaceClientSDK/Domain/LargeFaceList/DomainLargeFaceList';

APIReference.FaceAPIKey = '4e032a4875ff4bb08853aad50d8b0340';
APIReference.FaceAPIZone = 'southcentralus';

describe('LargeFaceList', () => {
  it('AddFaceAsync', async () => {
    let result: DomainLargeFaceList.AddFaceResult = null;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier)) {
        let userData: Object = new Object();
        userData['userDataSample'] = "User Data Sample";
        let testImageUrl: string = 'https://rdomingo1986.blob.core.windows.net/faceapitests/37357230_10155893037032858_4970212631118872576_n.jpg';
        result = await APIReference.Instance.LargeFaceList.AddFaceAsync(identifier, testImageUrl, JSON.stringify(userData), '');
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('CreateAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      result = await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier);
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.true;
  });

  it('DeleteAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
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
      let addFaceResult: DomainLargeFaceList.AddFaceResult = null;
      if(await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier)) {
        let userData: Object = new Object();
        userData['userDataSample'] = "User Data Sample";
        let testImageUrl: string = 'https://rdomingo1986.blob.core.windows.net/faceapitests/37357230_10155893037032858_4970212631118872576_n.jpg';
        addFaceResult = await APIReference.Instance.LargeFaceList.AddFaceAsync(identifier, testImageUrl, JSON.stringify(userData), '');
        if(addFaceResult != null) {
          result = await APIReference.Instance.LargeFaceList.DeleteFaceAsync(identifier, addFaceResult.persistedFaceId);
        }
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.true;
  });

  it('GetAsync', async () => {
    let result: DomainLargeFaceList.GetResult = null;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.LargeFaceList.GetAsync(identifier);
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('GetFaceAsync', async () => {
    let result: DomainLargeFaceList.GetFaceResult = null;
    let identifier: string = Guid.create().toString();

    try {
      let addFaceResult: DomainLargeFaceList.AddFaceResult = null;
      if(await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier)) {
        let userData: Object = new Object();
        userData['userDataSample'] = "User Data Sample";
        let testImageUrl: string = 'https://rdomingo1986.blob.core.windows.net/faceapitests/37357230_10155893037032858_4970212631118872576_n.jpg';
        addFaceResult = await APIReference.Instance.LargeFaceList.AddFaceAsync(identifier, testImageUrl, JSON.stringify(userData), '');
        if(addFaceResult != null) {
          result = await APIReference.Instance.LargeFaceList.GetFaceAsync(identifier, addFaceResult.persistedFaceId);
        }
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('GetTrainingStatusAsync', async () => {
    let result: DomainLargeFaceList.GetTrainingStatusResult = null;
    let identifier: string = Guid.create().toString();

    try {
      let addFaceResult: DomainLargeFaceList.AddFaceResult = null;
      if(await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier)) {
        let userData: Object = new Object();
        userData['userDataSample'] = "User Data Sample";
        let testImageUrl: string = 'https://rdomingo1986.blob.core.windows.net/faceapitests/37357230_10155893037032858_4970212631118872576_n.jpg';
        addFaceResult = await APIReference.Instance.LargeFaceList.AddFaceAsync(identifier, testImageUrl, JSON.stringify(userData), '');
        if(addFaceResult != null) {
          if(await APIReference.Instance.LargeFaceList.TrainAsync(identifier)) {
            while(true) {
              await msleep(1000);
              result = await APIReference.Instance.LargeFaceList.GetTrainingStatusAsync(identifier);

              if(result.status == 'running') {
                continue;
              } else {
                break;
              }
            }
          }
        }
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('ListAsync', async () => {
    let result: Array<DomainLargeFaceList.ListResult> = null;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.LargeFaceList.ListAsync('', 1000);
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('ListFaceAsync', async () => {
    let result: Array<DomainLargeFaceList.ListFaceResult> = null;
    let identifier: string = Guid.create().toString();

    try {
      let addFaceResult: DomainLargeFaceList.AddFaceResult = null;
      if(await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier)) {
        let userData: Object = new Object();
        userData['UserDataSample'] = "User Data Sample";
        let testImageUrl: string = 'https://rdomingo1986.blob.core.windows.net/faceapitests/37357230_10155893037032858_4970212631118872576_n.jpg';
        addFaceResult = await APIReference.Instance.LargeFaceList.AddFaceAsync(identifier, testImageUrl, JSON.stringify(userData), '');
        if(addFaceResult != null) {
          result = await APIReference.Instance.LargeFaceList.ListFaceAsync(identifier);
        }
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('TrainAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      let addFaceResult: DomainLargeFaceList.AddFaceResult = null;
      if(await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier)) {
        let userData: Object = new Object();
        userData['UserDataSample'] = "User Data Sample";
        let testImageUrl: string = 'https://rdomingo1986.blob.core.windows.net/faceapitests/37357230_10155893037032858_4970212631118872576_n.jpg';
        addFaceResult = await APIReference.Instance.LargeFaceList.AddFaceAsync(identifier, testImageUrl, JSON.stringify(userData), '');
        if(addFaceResult != null) {
          result = await APIReference.Instance.LargeFaceList.TrainAsync(identifier);
          let status: any = null;
          while(true) {
            await msleep(1000);
            status = await APIReference.Instance.LargeFaceList.GetTrainingStatusAsync(identifier);
            if(status.status == 'running') {
              continue;
            } else {
              break;
            }
          }
        }
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.true;
  });

  it('UpdateAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.LargeFaceList.UpdateAsync(identifier, "Name", "User Data Sample");
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.true;
  });

  it('UpdateFaceAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      let addFaceResult: DomainLargeFaceList.AddFaceResult = null;
      if(await APIReference.Instance.LargeFaceList.CreateAsync(identifier, identifier, identifier)) {
        let userData: Object = new Object();
        userData['UserDataSample'] = "User Data Sample";
        let testImageUrl: string = 'https://rdomingo1986.blob.core.windows.net/faceapitests/37357230_10155893037032858_4970212631118872576_n.jpg';
        addFaceResult = await APIReference.Instance.LargeFaceList.AddFaceAsync(identifier, testImageUrl, JSON.stringify(userData), '');
        if(addFaceResult != null) {
          result = await APIReference.Instance.LargeFaceList.UpdateFaceAsync(identifier, addFaceResult.persistedFaceId, "User Data Sample");
        }
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargeFaceList.DeleteAsync(identifier);
    }
    expect(result).to.be.true;
  });
});