export enum PayloadType {
  AUTH = 'AUTH',
  OPEN = 'OPEN'
}

export interface IBasePayload {
  type: PayloadType;
}

export interface IOauthToken {
  refresh_token?: string | null;
  expiry_date?: number | null;
  access_token?: string | null;
  token_type?: string | null;
  id_token?: string | null;
  scope?: string;
}

export interface IAuthServerPayload extends IBasePayload {
  token: IOauthToken;
}

export interface ISheetPayload {
  sheetId: string;
}
