export class NotSuccessfulResponse {
  public error: NotSuccessfulResponseError;
}

export class NotSuccessfulResponseError {
  private _code: string;

  public get code(): string {
    return (this._code == null || this._code.length == 0) ? this.statusCode.toString() : this._code;
  }

  public set code(value: string) {
    this._code = value;
  }

  private statusCode: number;

  public message: string;
}