import { IFaceList } from './Interfaces/IFaceList';
import * as DomainFaceList from './Domain/FaceList/DomainFaceList';
import { NotSuccessfulResponse } from './Domain/NotSuccessfulResponse';
import fetch from 'node-fetch';

export class APIReference {
  private static instance: APIReference = null;
  private static readonly padlock: Object = new Object();
  public static FaceAPIKey: string = null;
  public static FaceAPIZone: string = null;
  public FaceList: FaceList = FaceList.Instance;

  constructor() {}

  public static get Instance(): APIReference {
    if(this.instance == null) {
      this.instance = new APIReference();
    }
    return this.instance;
  }
}

export class FaceList implements IFaceList {
  private static instance: FaceList = null;
  private static readonly padlock: Object = new Object();

  constructor() {
    if(APIReference.FaceAPIKey == null || APIReference.FaceAPIKey.length == 0) {
      throw new Error('FaceAPIKey required by: APIReference.FaceAPIKey');
    }
    if(APIReference.FaceAPIZone == null || APIReference.FaceAPIZone.length == 0) {
      throw new Error('FaceAPIZone required by: APIReference.FaceAPIZone');
    }
  }

  public static get Instance(): FaceList {
    if(this.instance == null) {
      this.instance = new FaceList();
    }
    return this.instance;
  }

  public async AddFaceAsync(faceListId: string, url: string, userData: string, targetFace: string): Promise<DomainFaceList.AddFaceResult> {
    let body: Object = new Object();
    body['url'] = url;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/facelists/${faceListId}/persistedFaces?userData=${userData}&targetFace=${targetFace}`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': APIReference.FaceAPIKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    if(!response.ok) {
      let fex: NotSuccessfulResponse = await response.json();
      throw new Error(`${fex.error.code} - ${fex.error.message}`);
    }

    return await response.json();
  }

  public async CreateAsync(faceListId: string, name: string, userData: string): Promise<boolean> {
    let body: Object = new Object();
    body['name'] = name;
    body['userData'] = userData;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/facelists/${faceListId}`, {
      method: 'PUT',
      headers: {
        'Ocp-Apim-Subscription-Key': APIReference.FaceAPIKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if(!response.ok) {
      let fex: NotSuccessfulResponse = await response.json();
      throw new Error(`${fex.error.code} - ${fex.error.message}`);
    }

    return true;
  }

  public async DeleteAsync(faceListId: string): Promise<boolean> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/facelists/${faceListId}`, {
      method: 'DELETE',
      headers: {
        'Ocp-Apim-Subscription-Key': APIReference.FaceAPIKey
      }
    });

    if(!response.ok) {
      let fex: NotSuccessfulResponse = await response.json();
      throw new Error(`${fex.error.code} - ${fex.error.message}`);
    }

    return true;
  }

  public async DeleteFaceAsync(faceListId: string, persistedFaceId: string): Promise<boolean> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/facelists/${faceListId}/persistedfaces/${persistedFaceId}`, {
      method: 'DELETE',
      headers: {
        'Ocp-Apim-Subscription-Key': APIReference.FaceAPIKey
      }
    });

    if(!response.ok) {
      let fex: NotSuccessfulResponse = await response.json();
      throw new Error(`${fex.error.code} - ${fex.error.message}`);
    }

    return true;
  }

  public async GetAsync(faceListId: string): Promise<DomainFaceList.GetResult> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/facelists/${faceListId}`, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': APIReference.FaceAPIKey
      }
    });
    
    if(!response.ok) {
      let fex: NotSuccessfulResponse = await response.json();
      throw new Error(`${fex.error.code} - ${fex.error.message}`);
    }

    return await response.json();
  }

  public async ListAsync(): Promise<Array<DomainFaceList.ListResult>> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/facelists`, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': APIReference.FaceAPIKey
      }
    });
    
    if(!response.ok) {
      let fex: NotSuccessfulResponse = await response.json();
      throw new Error(`${fex.error.code} - ${fex.error.message}`);
    }

    return await response.json();
  }

  public async UpdateAsync(faceListId: string, name: string, userData: string): Promise<boolean> {
    let body: Object = new Object();
    body['name'] = name;
    body['userData'] = userData;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/facelists/${faceListId}`, {
      method: 'PATCH',
      headers: {
        'Ocp-Apim-Subscription-Key': APIReference.FaceAPIKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if(!response.ok) {
      let fex: NotSuccessfulResponse = await response.json();
      throw new Error(`${fex.error.code} - ${fex.error.message}`);
    }

    return true;
  }
}