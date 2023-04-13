import { injectable } from 'inversify';
import { IBasePayload, PayloadType } from '../../../shared/payloadInterface';
import type { IElectronDeepLinkService } from '../../inversify/interfaces';

@injectable()
export default class ElectronDeepLinkService implements IElectronDeepLinkService {
  processPayload(payload: IBasePayload) {
    switch (payload.type) {
      case PayloadType.OPEN: {
        break;
      }
      default: {
        break;
      }
    }
  }
}
