import { ipcMain, shell } from 'electron';
import ipcMsg from '../../../shared/ipcMsg';
import { MAIN_PROCESS_EVENT } from '../../constants';
import { IBrowserWindowService, IEventEmitterService } from '../../inversify/interfaces';
import dependencyInjector from '../../inversify/inversify.config';
import TYPES from '../../inversify/types';

const eventEmitterService = dependencyInjector.get<IEventEmitterService>(TYPES.EventEmitterService);
const browserWindowService = dependencyInjector.get<IBrowserWindowService>(
  TYPES.BrowserWindowService
);

ipcMain.on(ipcMsg.RendererToMain.LOGIN_REQUEST, () => {
  shell.openExternal(import.meta.env.VITE_OAUTH_SIGNIN_URL || '');
});

eventEmitterService.on(MAIN_PROCESS_EVENT.LOGIN_SUCCESS, () => {
  browserWindowService.sendToRenderer(ipcMsg.MainToRenderer.LOGIN_SUCCESS);
});
