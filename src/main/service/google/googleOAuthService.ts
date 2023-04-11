import { OAuth2Client } from 'google-auth-library';
import { inject, injectable } from 'inversify';
import { IOauthToken } from '../../../shared/payloadInterface';
import { MAIN_PROCESS_EVENT } from '../../constants';
import TYPES from '../../inversify/types';
import type { IEventEmitterService, IGoogleOAuthService } from '../../inversify/interfaces';

@injectable()
export default class GoogleOAuthService implements IGoogleOAuthService {
  private authClient: OAuth2Client;

  constructor(
    @inject(TYPES.EventEmitterService) private eventEmitterService: IEventEmitterService
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
    this.eventEmitterService.emit(MAIN_PROCESS_EVENT.LOGIN_SUCCESS);
  }
}
