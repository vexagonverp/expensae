import { Container } from 'inversify';
import 'reflect-metadata';
import EventEmitterService from '../service/communication/eventEmiterService';
import GoogleOAuthService from '../service/google/googleOAuthService';
import BrowserWindowService from '../service/system/browserWindowService';
import ElectronDeepLinkService from '../service/system/electronDeepLinkService';
import ElectronStoreService from '../service/system/electronStoreService';
import ElectronWrapperService from '../service/system/electronWrapperService';
import FileSystemService from '../service/system/fileSystemService';
import PathService from '../service/system/pathService';
import AuthServerService from '../service/worker/authServerService';
import {
  IAuthServerService,
  IBrowserWindowService,
  IElectronDeepLinkService,
  IElectronStore,
  IElectronWrapper,
  IEventEmitterService,
  IFileSystem,
  IGoogleOAuthService,
  IPath
} from './interfaces';
import TYPES from './types';

const dependencyInjector = new Container({ defaultScope: 'Singleton' });
dependencyInjector.bind<IBrowserWindowService>(TYPES.BrowserWindowService).to(BrowserWindowService);
dependencyInjector.bind<IFileSystem>(TYPES.FileSystem).to(FileSystemService);
dependencyInjector.bind<IPath>(TYPES.Path).to(PathService);

dependencyInjector.bind<IElectronWrapper>(TYPES.ElectronWrapper).to(ElectronWrapperService);
dependencyInjector.bind<IElectronStore>(TYPES.ElectronStore).to(ElectronStoreService);
dependencyInjector
  .bind<IElectronDeepLinkService>(TYPES.ElectronDeepLinkService)
  .to(ElectronDeepLinkService);
dependencyInjector.bind<IEventEmitterService>(TYPES.EventEmitterService).to(EventEmitterService);
dependencyInjector.bind<IAuthServerService>(TYPES.AuthServerService).to(AuthServerService);
dependencyInjector.bind<IGoogleOAuthService>(TYPES.OAuthService).to(GoogleOAuthService);

export default dependencyInjector;
