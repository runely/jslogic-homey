import Homey from 'homey';

export default class ExtendedHomeyApp extends Homey.App {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logWarn (...args: any[]): void {
    this.log('[WARN] -', args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logError (...args: any[]): void {
    this.log('[ERROR] -', args);
  }
}
