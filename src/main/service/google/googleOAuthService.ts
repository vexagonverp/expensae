import { OAuth2Client } from 'google-auth-library';
import { injectable } from 'inversify';
import { IOauthToken } from '../../../shared/payloadInterface';
import { IGoogleOAuthService } from '../../inversify/interfaces';

@injectable()
export default class GoogleOAuthService implements IGoogleOAuthService {
  private authClient: OAuth2Client;

  constructor() {
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
  }
}
