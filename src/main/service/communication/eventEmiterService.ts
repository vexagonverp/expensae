import { injectable } from 'inversify';
import { IEventEmitterService } from '../../inversify/interfaces';

@injectable()
export default class EventEmitterService implements IEventEmitterService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private listeners: Record<string, ((...args: any[]) => void)[]> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public on(event: string, listener: (...args: any[]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public once(event: string, listener: (...args: any[]) => void): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onceListener = (...args: any[]) => {
      this.off(event, onceListener);
      listener(...args);
    };
    this.on(event, onceListener);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public off(event: string, listener: (...args: any[]) => void): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
