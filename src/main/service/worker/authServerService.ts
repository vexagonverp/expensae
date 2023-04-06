import { UtilityProcess, utilityProcess } from 'electron';
import { injectable } from 'inversify';
import { IAuthServerService } from '../../inversify/interfaces';
import { getWorkerPath } from '../../utils';

@injectable()
export default class AuthServerService implements IAuthServerService {
  private authServerWorker!: UtilityProcess;

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
      this.authServerWorker.postMessage('start');
    }
  }
}
