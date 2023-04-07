import { injectable } from 'inversify';
import { IAuthServerPayload, IBasePayload, PayloadType } from 'src/shared/payloadInterface';
import { IElectronDeepLinkService } from '../../inversify/interfaces';

@injectable()
export default class ElectronDeepLinkService implements IElectronDeepLinkService {
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
    return payload;
  }
}
