import { OAuth2Client } from 'google-auth-library';
import { inject, injectable } from 'inversify';
import { AUTHSERVER } from '../../../shared/constants';
import { IOauthToken } from '../../../shared/payloadInterface';
import { ELECTRON_STORE_KEY, MAIN_PROCESS_EVENT } from '../../constants';
import TYPES from '../../inversify/types';
import type {
  IElectronStore,
  IEventEmitterService,
  IGoogleOAuthService
} from '../../inversify/interfaces';

@injectable()
export default class GoogleOAuthService implements IGoogleOAuthService {
  private authClient: OAuth2Client;

  constructor(
    @inject(TYPES.EventEmitterService) private eventEmitterService: IEventEmitterService,
    @inject(TYPES.ElectronStore) private electronStoreService: IElectronStore
  ) {
    this.authClient = new OAuth2Client({
      clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
      clientSecret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
      redirectUri: `http://127.0.0.1:${AUTHSERVER.PORT}${AUTHSERVER.OAUTH_PATH}`
    });
  }

  getAuthClient(): OAuth2Client {
    if (this.authClient.credentials) return this.authClient;
    throw new Error('No credentials');
  }

  processOAuthToken(token: IOauthToken): void {
    this.authClient.setCredentials(token);
    if (token.refresh_token) {
      const saveToken = this.electronStoreService.encrypt(token.refresh_token);
      this.electronStoreService.set(ELECTRON_STORE_KEY.OAUTH_TOKEN, saveToken);
    }
    this.eventEmitterService.emit(MAIN_PROCESS_EVENT.LOGIN_SUCCESS);
  }

  async checkOAuthToken(): Promise<boolean> {
    let loadToken = this.electronStoreService.get(ELECTRON_STORE_KEY.OAUTH_TOKEN);
    if (!loadToken) return false;
    loadToken = this.electronStoreService.decrypt(loadToken);
    this.authClient.setCredentials({
      refresh_token: loadToken
    });
    const result = await this.authClient
      .getAccessToken()
      .then((accessToken) => {
        this.authClient.setCredentials({
          ...accessToken.res?.data
        });
        return true;
      })
      .catch(() => false);
    return Promise.resolve(result);
  }

  getOAuthUrl(): string {
    const url = this.authClient.generateAuthUrl({
      prompt: 'consent',
      scope: ['https://www.googleapis.com/auth/spreadsheets'],
      access_type: 'offline'
    });
    return url;
  }
}
