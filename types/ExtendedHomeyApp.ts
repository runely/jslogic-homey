import Homey from 'homey';

export default class ExtendedHomeyApp extends Homey.App {
  logWarn(...args: unknown[]): void {
    this.log('[WARN] -', args);
  }

  logError(...args: unknown[]): void {
    this.log('[ERROR] -', args);
  }
}
