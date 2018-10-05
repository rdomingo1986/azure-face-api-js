import { IFace } from './Interfaces/IFace';
import { IFaceList } from './Interfaces/IFaceList';
import { ILargeFaceList } from './Interfaces/ILargeFaceList';
import { ILargePersonGroup } from './Interfaces/ILargePersonGroup';
import { ILargePersonGroupPerson } from './Interfaces/ILargePersonGroupPerson';
import * as DomainFace from './Domain/Face/DomainFace';
import * as DomainFaceList from './Domain/FaceList/DomainFaceList';
import * as DomainLargeFaceList from './Domain/LargeFaceList/DomainLargeFaceList';
import * as DomainLargePersonGroup from './Domain/LargePersonGroup/DomainLargePersonGroup';
import * as DomainLargePersonGroupPerson from './Domain/LargePersonGroupPerson/DomainLargePersonGroupPerson';
import { NotSuccessfulResponse } from './Domain/NotSuccessfulResponse';
// solo para pruebas unitarias
// import fetch from 'node-fetch';

export class APIReference {
  private static instance: APIReference = null;
  private static readonly padlock: Object = new Object();
  public static FaceAPIKey: string = null;
  public static FaceAPIZone: string = null;
  public Face: Face = Face.Instance;
  public FaceList: FaceList = FaceList.Instance;
  public LargeFaceList: LargeFaceList = LargeFaceList.Instance;
  public LargePersonGroup: LargePersonGroup = LargePersonGroup.Instance;
  public LargePersonGroupPerson: LargePersonGroupPerson = LargePersonGroupPerson.Instance;

  constructor() {}

  public static get Instance(): APIReference {
    if(this.instance == null) {
      this.instance = new APIReference();
    }
    return this.instance;
  }
}

export class Face implements IFace {
  private static instance: Face = null;
  private static readonly padlock: Object = new Object();

  constructor() {
    if(APIReference.FaceAPIKey == null || APIReference.FaceAPIKey.length == 0) {
      throw new Error('FaceAPIKey required by: APIReference.FaceAPIKey');
    }
    if(APIReference.FaceAPIZone == null || APIReference.FaceAPIZone.length == 0) {
      throw new Error('FaceAPIZone required by: APIReference.FaceAPIZone');
    }
  }

  public static get Instance(): Face {
    if(this.instance == null) {
      this.instance = new Face();
    }
    return this.instance;
  }

  public async DetectAsync(url: string, returnFaceAttributes: string, returnFaceId: boolean, returnFaceLandmarks: boolean): Promise<Array<DomainFace.DetectResult>> {
    let body: Object = new Object();
    body['url'] = url;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=${returnFaceId}&returnFaceLandmarks=${returnFaceLandmarks}&returnFaceAttributes=${returnFaceAttributes}`, {
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

  public async FindSimilarAsync(faceId: string, faceListId: string, largeFaceListId: string, faceIds: string[], maxNumOfCandidatesReturned: Number[], mode: string): Promise<Array<DomainFace.FindSimilarResult>> {
    throw new Error("Method not implemented.");
  }

  public async VerifyAsync(faceId1: string, faceId2: string, faceId: string, personGroupId: string, largePersonGroupId: string, personId: string): Promise<DomainFace.VerifyResult> {
    throw new Error("Method not implemented.");
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

export class LargePersonGroupPerson implements ILargePersonGroupPerson {
  private static instance: LargePersonGroupPerson = null;
  private static readonly padlock: Object = new Object();

  constructor() {
    if(APIReference.FaceAPIKey == null || APIReference.FaceAPIKey.length == 0) {
      throw new Error('FaceAPIKey required by: APIReference.FaceAPIKey');
    }
    if(APIReference.FaceAPIZone == null || APIReference.FaceAPIZone.length == 0) {
      throw new Error('FaceAPIZone required by: APIReference.FaceAPIZone');
    }
  }

  public static get Instance(): LargePersonGroupPerson {
    if(this.instance == null) {
      this.instance = new LargePersonGroupPerson();
    }
    return this.instance;
  }

  public async AddFaceAsync(largePersonGroupId: string, personId: string, url: string, userData: string, targetFace: string): Promise<DomainLargePersonGroupPerson.AddFaceResult> {
    let body: Object = new Object();
    body['url'] = url;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}/persons/${personId}/persistedfaces?userData=${userData}&targetFace=${targetFace}`, {
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

  public async CreateAsync(largePersonGroupId: string, name: string, userData: string): Promise<DomainLargePersonGroupPerson.CreateResult> {
    let body: Object = new Object();
    body['name'] = name;
    body['userData'] = userData;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}/persons`, {
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

  public async DeleteAsync(largePersonGroupId: string, personId: string): Promise<boolean> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}/persons/${personId}`, {
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

  public async DeleteFaceAsync(largePersonGroupId: string, personId: string, persistedFaceId: string): Promise<boolean> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}/persons/${personId}/persistedfaces/${persistedFaceId}`, {
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

  public async GetAsync(largePersonGroupId: string, personId: string): Promise<DomainLargePersonGroupPerson.GetResult> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}/persons/${personId}`, {
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

  public async GetFaceAsync(largePersonGroupId: string, personId: string, persistedFaceId: string): Promise<DomainLargePersonGroupPerson.GetFaceResult> {
    let response: Response = await fetch(`https://{APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}/persons/${personId}/persistedfaces/${persistedFaceId}`, {
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

  public async ListAsync(largePersonGroupId: string, start: string, top: number): Promise<Array<DomainLargePersonGroupPerson.ListResult>> {
    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}/persons?start=${start}&top=${top}`, {
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

  public async UpdateAsync(largePersonGroupId: string, personId: string, name: string, userData: string): Promise<boolean> {
    let body: Object = new Object();
    body['name'] = name;
    body['userData'] = userData;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}/persons/${personId}`, {
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

    return true
  }

  public async UpdateFaceAsync(largePersonGroupId: string, personId: string, persistedFaceId: string, userData: string): Promise<boolean> {
    let body: Object = new Object();
    body['name'] = name;
    body['userData'] = userData;

    let response: Response = await fetch(`https://${APIReference.FaceAPIZone}.api.cognitive.microsoft.com/face/v1.0/largepersongroups/${largePersonGroupId}/persons/${personId}/persistedfaces/${persistedFaceId}`, {
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

    return true
  }
}