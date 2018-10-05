import { expect } from 'chai';
import { Guid } from "guid-typescript";
import { msleep } from 'sleep';
import { APIReference } from '../FaceClientSDK/APIReference';
import * as DomainLargePersonGroup from '../FaceClientSDK/Domain/LargePersonGroup/DomainLargePersonGroup';

APIReference.FaceAPIKey = '0328672ce40b421f8b2ec53b76101b19';
APIReference.FaceAPIZone = 'southcentralus';

describe('LargePersonGroup', () => {
  it('CreateAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      result = await APIReference.Instance.LargePersonGroup.CreateAsync(identifier, identifier, identifier);
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargePersonGroup.DeleteAsync(identifier);
    }
    expect(result).to.be.true;
  });

  it('DeleteAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.LargePersonGroup.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.LargePersonGroup.DeleteAsync(identifier);
      }
    } catch(error) {
      throw new Error(error);
    }
    expect(result).to.be.true;
  });

  it('GetAsync', async () => {
    let result: DomainLargePersonGroup.GetResult = null;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.LargePersonGroup.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.LargePersonGroup.GetAsync(identifier);
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargePersonGroup.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('GetTrainingStatusAsync', async () => {
    let result: DomainLargePersonGroup.GetTrainingStatusResult = null;
    let identifier: string = Guid.create().toString();

    try {
      await APIReference.Instance.LargePersonGroup.CreateAsync(identifier, identifier, identifier);

      let trainingResult: boolean = false;
      trainingResult = await APIReference.Instance.LargePersonGroup.TrainAsync(identifier);
      if(trainingResult) {
        while(true) {
          await msleep(1000);
          result = await APIReference.Instance.LargePersonGroup.GetTrainingStatusAsync(identifier);
          if(result.status == 'running') {
            continue;
          } else {
            break;
          }
        }
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargePersonGroup.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('ListAsync', async () => {
    let result: Array<DomainLargePersonGroup.ListResult> = null;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.LargePersonGroup.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.LargePersonGroup.ListAsync('', 1000);
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargePersonGroup.DeleteAsync(identifier);
    }
    expect(result).to.be.not.null;
  });

  it('TrainAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      await APIReference.Instance.LargePersonGroup.CreateAsync(identifier, identifier, identifier);
      result = await APIReference.Instance.LargePersonGroup.TrainAsync(identifier);
      let status: any = null;
      while(true) {
        await msleep(1000);
        status = await APIReference.Instance.LargePersonGroup.GetTrainingStatusAsync(identifier);
        if(status.status == 'running') {
          continue;
        } else {
          break;
        }
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargePersonGroup.DeleteAsync(identifier);
    }
    expect(result).to.be.true;
  });

  it('UpdateAsync', async () => {
    let result: boolean = false;
    let identifier: string = Guid.create().toString();

    try {
      if(await APIReference.Instance.LargePersonGroup.CreateAsync(identifier, identifier, identifier)) {
        result = await APIReference.Instance.LargePersonGroup.UpdateAsync(identifier, "Name", "User Data Sample");
      }
    } catch(error) {
      throw new Error(error);
    } finally {
      await APIReference.Instance.LargePersonGroup.DeleteAsync(identifier);
    }
    expect(result).to.be.true;
  });
});