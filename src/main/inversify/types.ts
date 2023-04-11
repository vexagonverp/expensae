const TYPES = {
  FileSystem: Symbol.for('IFileSystem'),
  Path: Symbol.for('IPath'),
  ElectronWrapper: Symbol.for('IElectronWrapper'),
  AuthServerService: Symbol.for('IAuthServerService'),
  ElectronDeepLinkService: Symbol.for('IElectronDeepLinkService'),
  EventEmitterService: Symbol.for('IEventEmitterService'),
  OAuthService: Symbol.for('IAuthService'),
  BrowserWindowService: Symbol.for('IBrowserWindowService')
};

export default TYPES;
