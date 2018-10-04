export class PersistedFaces {
  persistedFaceId: string;
  userData: string;
}

export class GetResult {
  faceListId: string;
  name: string;
  userData: string;
  persistedFaces: Array<PersistedFaces>;
}