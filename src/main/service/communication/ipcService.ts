import { ipcMain, shell } from 'electron';
import ipcMsg from '../../../shared/ipcMsg';

ipcMain.on(ipcMsg.RendererToMain.LOGIN_REQUEST, () => {
  shell.openExternal(import.meta.env.VITE_OAUTH_SIGNIN_URL || '');
});
