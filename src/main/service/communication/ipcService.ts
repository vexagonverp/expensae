import { ipcMain, shell } from 'electron';
import ipcMsg from '../../../shared/ipcMsg';
import { MAIN_PROCESS_EVENT } from '../../constants';
import {
  IBrowserWindowService,
  IEventEmitterService,
  IGoogleOAuthService
} from '../../inversify/interfaces';
import dependencyInjector from '../../inversify/inversify.config';
import TYPES from '../../inversify/types';

const eventEmitterService = dependencyInjector.get<IEventEmitterService>(TYPES.EventEmitterService);
const browserWindowService = dependencyInjector.get<IBrowserWindowService>(
  TYPES.BrowserWindowService
);
const googleOAuthService = dependencyInjector.get<IGoogleOAuthService>(TYPES.OAuthService);

ipcMain.on(ipcMsg.RendererToMain.LOGIN_REQUEST, () => {
  shell.openExternal(googleOAuthService.getOAuthUrl() || '');
});

eventEmitterService.on(MAIN_PROCESS_EVENT.LOGIN_SUCCESS, () => {
  browserWindowService.sendToRenderer(ipcMsg.MainToRenderer.LOGIN_SUCCESS);
});

ipcMain.handle(ipcMsg.RendererMainRenderer.TOKEN_CHECK, async () => {
  const result = await googleOAuthService.checkOAuthToken();
  return Promise.resolve(result);
});
