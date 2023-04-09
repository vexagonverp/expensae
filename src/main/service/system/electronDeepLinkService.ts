import { inject, injectable } from 'inversify';
import { IAuthServerPayload, IBasePayload, PayloadType } from '../../../shared/payloadInterface';
import TYPES from '../../inversify/types';
import type { IElectronDeepLinkService, IGoogleOAuthService } from '../../inversify/interfaces';

@injectable()
export default class ElectronDeepLinkService implements IElectronDeepLinkService {
  constructor(@inject(TYPES.OAuthService) private oAuthService: IGoogleOAuthService) {}

  processPayload(payload: IBasePayload) {
    switch (payload.type) {
      case PayloadType.AUTH: {
        this.processAuthPayload(payload as IAuthServerPayload);
        break;
      }
      default: {
        break;
      }
    }
  }

  private processAuthPayload(payload: IAuthServerPayload) {
    this.oAuthService.processOAuthToken(payload.token);
    return payload;
  }
}
