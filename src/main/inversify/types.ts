const TYPES = {
  FileSystem: Symbol.for('IFileSystem'),
  Path: Symbol.for('IPath'),
  ElectronWrapper: Symbol.for('IElectronWrapper'),
  AuthServerService: Symbol.for('IAuthServerService'),
  ElectronDeepLinkService: Symbol.for('IElectronDeepLinkService'),
  OAuthService: Symbol.for('IAuthService')
};

export default TYPES;
