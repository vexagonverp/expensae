export enum PayloadType {
  AUTH = 'AUTH'
}

export interface IBasePayload {
  type: PayloadType;
}

export interface IAuthServerPayload extends IBasePayload {
  code: string;
}
