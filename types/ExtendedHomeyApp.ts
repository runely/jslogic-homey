import Homey from "homey";

export default class ExtendedHomeyApp extends Homey.App {
  logWarn(...args: any[]): void {
    this.log('[WARN] -', args)
  }
  
  logError(...args: any[]): void {
    this.log('[ERROR] -', args)
  }
}
