import { ipcMain, shell } from 'electron';
import ipcMsg from '../../../shared/ipcMsg';
import { ISheetPayload } from '../../../shared/payloadInterface';
import { MAIN_PROCESS_EVENT } from '../../constants';
import {
  IBrowserWindowService,
  IEventEmitterService,
  IGoogleOAuthService,
  IGoogleSheetService
} from '../../inversify/interfaces';
import dependencyInjector from '../../inversify/inversify.config';
import TYPES from '../../inversify/types';

const eventEmitterService = dependencyInjector.get<IEventEmitterService>(TYPES.EventEmitterService);
const browserWindowService = dependencyInjector.get<IBrowserWindowService>(
  TYPES.BrowserWindowService
);
const googleOAuthService = dependencyInjector.get<IGoogleOAuthService>(TYPES.OAuthService);
const googleSheetService = dependencyInjector.get<IGoogleSheetService>(TYPES.GoogleSheetService);

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

ipcMain.handle(ipcMsg.RendererMainRenderer.SHEET_ID, async (_event, payload) => {
  const sheetPayload: ISheetPayload = payload[0];
  const result = await googleSheetService.getWorkSheet(sheetPayload.sheetId);
  return Promise.resolve(result);
});

ipcMain.handle(ipcMsg.RendererMainRenderer.SHEET_VALUE, async (_event, payload) => {
  const sheetTitle: string = payload[0];
  const sheetIndex: number = payload[1];
  const sheetId: string = payload[2];
  const sheetExist = await googleSheetService.getTabSheet(sheetIndex, sheetId);
  if (!sheetExist.length) await googleSheetService.createTabSheet(sheetTitle, sheetIndex, sheetId);
  const result = await googleSheetService.getTabSheetValue(sheetTitle, sheetId);
  return Promise.resolve(result);
});
