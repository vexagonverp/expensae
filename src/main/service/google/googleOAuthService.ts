import { OAuth2Client } from 'google-auth-library';
import { inject, injectable } from 'inversify';
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
      clientId: import.meta.env.VITE_OAUTH_CLIENT_ID
    });
  }

  getAuthClient(): OAuth2Client {
    if (this.authClient.credentials) return this.authClient;
    throw new Error('No credentials');
  }

  processOAuthToken(token: IOauthToken): void {
    this.authClient.setCredentials(token);
    const saveToken = token;
    if (saveToken.access_token) {
      saveToken.access_token = this.electronStoreService.encrypt(saveToken.access_token);
    }
    if (saveToken.refresh_token) {
      saveToken.refresh_token = this.electronStoreService.encrypt(saveToken.refresh_token);
    }
    this.electronStoreService.set(ELECTRON_STORE_KEY.OAUTH_TOKEN, saveToken);
    this.eventEmitterService.emit(MAIN_PROCESS_EVENT.LOGIN_SUCCESS);
  }

  checkOauthToken(): boolean {
    const loadToken: IOauthToken = this.electronStoreService.get(ELECTRON_STORE_KEY.OAUTH_TOKEN);
    if (!loadToken) return false;
    if (loadToken.access_token) {
      loadToken.access_token = this.electronStoreService.decrypt(loadToken.access_token);
    }
    if (loadToken.refresh_token) {
      loadToken.refresh_token = this.electronStoreService.decrypt(loadToken.refresh_token);
    }
    this.authClient.setCredentials(loadToken);
    return true;
  }
}
