import { Container } from 'inversify';
import 'reflect-metadata';
import ElectronDeepLinkService from '../service/system/electronDeepLinkService';
import ElectronWrapperService from '../service/system/electronWrapperService';
import FileSystemService from '../service/system/fileSystemService';
import PathService from '../service/system/pathService';
import AuthServerService from '../service/worker/authServerService';
import {
  IAuthServerService,
  IElectronDeepLinkService,
  IElectronWrapper,
  IFileSystem,
  IPath
} from './interfaces';
import TYPES from './types';

const dependencyInjector = new Container({ defaultScope: 'Singleton' });
dependencyInjector.bind<IFileSystem>(TYPES.FileSystem).to(FileSystemService);
dependencyInjector.bind<IPath>(TYPES.Path).to(PathService);

dependencyInjector.bind<IElectronWrapper>(TYPES.ElectronWrapper).to(ElectronWrapperService);
dependencyInjector
  .bind<IElectronDeepLinkService>(TYPES.ElectronDeepLinkService)
  .to(ElectronDeepLinkService);
dependencyInjector.bind<IAuthServerService>(TYPES.AuthServerService).to(AuthServerService);

export default dependencyInjector;
