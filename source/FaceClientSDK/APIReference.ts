import { IFaceList } from './Interfaces/IFaceList';
import { ILargeFaceList } from './Interfaces/ILargeFaceList';
import { ILargePersonGroup } from './Interfaces/ILargePersonGroup';
import * as DomainFaceList from './Domain/FaceList/DomainFaceList';
import * as DomainLargeFaceList from './Domain/LargeFaceList/DomainLargeFaceList';
import * as DomainLargePersonGroup from './Domain/LargePersonGroup/DomainLargePersonGroup';
import { NotSuccessfulResponse } from './Domain/NotSuccessfulResponse';
// solo para pruebas unitarias
import fetch from 'node-fetch';

export class APIReference {
  private static instance: APIReference = null;
  private static readonly padlock: Object = new Object();
  public static FaceAPIKey: string = null;
  public static FaceAPIZone: string = null;
  public FaceList: FaceList = FaceList.Instance;
  public LargeFaceList: LargeFaceList = LargeFaceList.Instance;
  public LargePersonGroup: LargePersonGroup = LargePersonGroup.Instance;

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

export class LargeFaceList implements ILargeFaceList {
  private static instance: LargeFaceList = null;
  private static readonly padlock: Object = new Object();

  constructor() {
    if(APIReference.FaceAPIKey == null || APIReference.FaceAPIKey.length == 0) {
      throw new Error('FaceAPIKey required by: APIReference.FaceAPIKey');
    }
    if(APIReference.FaceAPIZone == null || APIReference.FaceAPIZone.length == 0) {
      throw new Error('FaceAPIZone required by: APIReference.FaceAPIZone');
    }
  }

  public static get Instance(): LargeFaceList {
    if(this.instance == null) {
      this.instance = new LargeFaceList();
    }
    return this.instance;
  }

  public async AddFaceAsync(largeFaceListId: string, url: string, userData: string, targetFace: string): Promise<DomainLargeFaceList.AddFaceResult> {
    let body: Object = new Object();
    body['url'] = url;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists/${largeFaceListId}/persistedFaces?userData=${userData}&targetFace=${targetFace}`, {
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

  public async CreateAsync(largeFaceListId: string, name: string, userData: string): Promise<boolean> {
    let body: Object = new Object();
    body['name'] = name;
    body['userData'] = userData;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists/${largeFaceListId}`, {
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

  public async DeleteAsync(largeFaceListId: string): Promise<boolean> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists/${largeFaceListId}`, {
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

  public async DeleteFaceAsync(largeFaceListId: string, persistedFaceId: string): Promise<boolean> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists/${largeFaceListId}/persistedfaces/${persistedFaceId}`, {
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

  public async GetAsync(largeFaceListId: string): Promise<DomainLargeFaceList.GetResult> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists/${largeFaceListId}`, {
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

  public async GetFaceAsync(largeFaceListId: string, persistedFaceId: string): Promise<DomainLargeFaceList.GetFaceResult> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists/${largeFaceListId}/persistedfaces/${persistedFaceId}`, {
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

  public async GetTrainingStatusAsync(largeFaceListId: string): Promise<DomainLargeFaceList.GetTrainingStatusResult> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists/${largeFaceListId}/training`, {
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

  public async ListAsync(start: string, top: number): Promise<Array<DomainLargeFaceList.ListResult>> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists?start=${start}&top=${top}`, {
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

  public async ListFaceAsync(largeFaceListId: string): Promise<Array<DomainLargeFaceList.ListFaceResult>> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists/${largeFaceListId}/persistedfaces`, {
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

  public async TrainAsync(largeFaceListId: string): Promise<boolean> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists/${largeFaceListId}/train`, {
      method: 'POST',
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

  public async UpdateAsync(largeFaceListId: string, name: string, userData: string): Promise<boolean> {
    let body: Object = new Object();
    body['name'] = name;
    body['userData'] = userData;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists/${largeFaceListId}`, {
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

  public async UpdateFaceAsync(largeFaceListId: string, persistedFaceId: string, userData: string): Promise<boolean> {
    let body: Object = new Object();
    body['userData'] = userData;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largefacelists/${largeFaceListId}/persistedfaces/${persistedFaceId}`, {
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

export class LargePersonGroup implements ILargePersonGroup {
  private static instance: LargePersonGroup = null;
  private static readonly padlock: Object = new Object();

  constructor() {
    if(APIReference.FaceAPIKey == null || APIReference.FaceAPIKey.length == 0) {
      throw new Error('FaceAPIKey required by: APIReference.FaceAPIKey');
    }
    if(APIReference.FaceAPIZone == null || APIReference.FaceAPIZone.length == 0) {
      throw new Error('FaceAPIZone required by: APIReference.FaceAPIZone');
    }
  }

  public static get Instance(): LargePersonGroup {
    if(this.instance == null) {
      this.instance = new LargePersonGroup();
    }
    return this.instance;
  }

  public async CreateAsync(largePersonGroupId: string, name: string, userData: string): Promise<boolean> {
    let body: Object = new Object();
    body['name'] = name;
    body['userData'] = userData;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}`, {
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

  public async DeleteAsync(largePersonGroupId: string): Promise<boolean> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}`, {
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

  public async GetAsync(largePersonGroupId: string): Promise<DomainLargePersonGroup.GetResult> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}`, {
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

  public async GetTrainingStatusAsync(largePersonGroupId: string): Promise<DomainLargePersonGroup.GetTrainingStatusResult> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}/training`, {
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

  public async ListAsync(start: string, top: number): Promise<Array<DomainLargePersonGroup.ListResult>> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups?start=${start}&top=${top}`, {
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

  public async TrainAsync(largePersonGroupId: string): Promise<boolean> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}/train`, {
      method: 'POST',
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

  public async UpdateAsync(largePersonGroupId: string, name: string, userData: string): Promise<boolean> {
    let body: Object = new Object();
    body['name'] = name;
    body['userData'] = userData;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}`, {
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