declare global {
  interface Window {
    ipcChannel: {
      /* ELECTRON IPC TYPES */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      send(channel: string, ...args: any[]): void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      receive(channel: string, callback: (...args: any[]) => void): void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sendAndReceive: (channel: string, ...args: any[]) => Promise<any> | undefined;
    };
    ipcStorage: {
      /* ELECTRON IPC TYPES */
      set: (key: string, val: unknown) => void;
      get: (key: string) => unknown;
    };
  }
}

export {};
