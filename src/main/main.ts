// eslint-disable-next-line import/no-extraneous-dependencies
import path from 'path';
import { app, BrowserWindow } from 'electron';
import { DEEPLINK } from '../shared/constants';
import { IBasePayload } from '../shared/payloadInterface';
import { IAuthServerService, IElectronDeepLinkService } from './inversify/interfaces';
import dependencyInjector from './inversify/inversify.config';
import TYPES from './inversify/types';
import { getPreloadPath, getHtmlPath } from './utils';
import './service/communication/ipcService';

let mainWindow: BrowserWindow;
const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    icon: '../../assets/icons/256x256.png',
    webPreferences: {
      preload: getPreloadPath('preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(getHtmlPath('index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

const initService = () => {
  dependencyInjector.get<IAuthServerService>(TYPES.AuthServerService).init();
};

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(DEEPLINK.NAME_SPACE, process.execPath, [
      path.resolve(process.argv[1])
    ]);
  }
} else {
  app.setAsDefaultProtocolClient(DEEPLINK.NAME_SPACE);
}
const appInstanceLock = app.requestSingleInstanceLock();

if (!appInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', (_, commandLine) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      const url = commandLine.find((command) => command.startsWith(`${DEEPLINK.NAME_SPACE}://`));
      if (url) {
        try {
          const payload: IBasePayload = JSON.parse(
            decodeURIComponent(url.slice(0, -1).replace(`${DEEPLINK.NAME_SPACE}://`, ''))
          );
          dependencyInjector
            .get<IElectronDeepLinkService>(TYPES.ElectronDeepLinkService)
            .processPayload(payload);
        } catch (error) {
          console.error(error);
        }
      }
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    initService();
    createWindow();
  });

  app.on('open-url', (_, url) => {
    const payload: IBasePayload = JSON.parse(
      decodeURIComponent(url.slice(0, -1).replace(`${DEEPLINK.NAME_SPACE}://`, ''))
    );
    dependencyInjector
      .get<IElectronDeepLinkService>(TYPES.ElectronDeepLinkService)
      .processPayload(payload);
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
