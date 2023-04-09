import { contextBridge, ipcRenderer } from 'electron';
import ipcMsg from '../shared/ipcMsg';

contextBridge.exposeInMainWorld('ipcChannel', {
  // From render to main.
  send: (channel: string, ...args: unknown[]) => {
    const validChannels = Object.values(ipcMsg.RendererToMain);
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, ...args);
    }
  },
  // From main to render.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  receive: (channel: string, callback: (...args0: any) => void) => {
    const validChannels = Object.values(ipcMsg.MainToRenderer);
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },
  // From render to main and back again.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendAndReceive: (channel: string, ...args: any[]): Promise<any> | undefined => {
    const validChannels = Object.values(ipcMsg.RendererMainRenderer);
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, args);
    }
    return undefined;
  }
});
