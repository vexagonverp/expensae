import { UtilityProcess, utilityProcess } from 'electron';
import { inject, injectable } from 'inversify';
import { IAuthServerPayload, PayloadType } from '../../../shared/payloadInterface';
import TYPES from '../../inversify/types';
import { getWorkerPath } from '../../utils';
import type { IAuthServerService, IGoogleOAuthService } from '../../inversify/interfaces';

@injectable()
export default class AuthServerService implements IAuthServerService {
  private authServerWorker!: UtilityProcess;

  constructor(@inject(TYPES.OAuthService) private oAuthService: IGoogleOAuthService) {}

  init() {
    this.startServer();
  }

  private startServer() {
    if (!this.authServerWorker) {
      this.authServerWorker = utilityProcess.fork(getWorkerPath('authServerWorker.js'), undefined, {
        serviceName: 'expensae-auth-server',
        stdio: 'pipe'
      });
      this.authServerWorker.stdout?.on('data', (data) => {
        // eslint-disable-next-line no-console
        console.info(`${data.toString()}`);
      });
      this.authServerWorker.stderr?.on('data', (data) => {
        // eslint-disable-next-line no-console
        console.error(`${data.toString()}`);
      });
      this.authServerWorker.once('exit', () => {
        setTimeout(this.startServer.bind(this), 200);
      });
      this.authServerWorker.on('message', (data: IAuthServerPayload) => {
        if (data.type === PayloadType.AUTH) this.oAuthService.processOAuthToken(data.token);
      });
    }
  }
}
