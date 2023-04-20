/* eslint-disable @typescript-eslint/no-explicit-any */
import { safeStorage } from 'electron';
import Store from 'electron-store';
import { injectable } from 'inversify';
import { IElectronStore } from '../../inversify/interfaces';

@injectable()
export default class ElectronStoreService implements IElectronStore {
  private store: Store;

  // eslint-disable-next-line no-undef
  private bufferEncoding: BufferEncoding;

  constructor() {
    this.store = new Store();
    this.bufferEncoding = 'latin1';
  }

  get(key: string, defaultValue?: any): any {
    return this.store.get(key, defaultValue);
  }

  set(key: string, value?: any): void {
    this.store.set(key, value);
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  encrypt(value: string): string {
    if (safeStorage.isEncryptionAvailable()) {
      return safeStorage.encryptString(value).toString(this.bufferEncoding);
    }
    return value;
  }

  decrypt(value: string): string {
    if (safeStorage.isEncryptionAvailable()) {
      return safeStorage.decryptString(Buffer.from(value, this.bufferEncoding));
    }
    return value;
  }
}
