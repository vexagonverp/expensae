import { BrowserWindow } from 'electron';
import { injectable } from 'inversify';
import { IBrowserWindowService } from '../../inversify/interfaces';

@injectable()
export default class BrowserWindowService implements IBrowserWindowService {
  private win!: BrowserWindow;

  init(browserWindow: BrowserWindow): void {
    this.win = browserWindow;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendToRenderer(channel: string, data: any): void {
    if (!this.win?.webContents) return;
    this.win.webContents.send(channel, data);
  }

  getBrowserWindow(): BrowserWindow {
    return this.win;
  }
}
