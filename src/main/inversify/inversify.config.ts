import { Container } from 'inversify';
import ElectronWrapperService from '../service/system/electronWrapperService';
import FileSystemService from '../service/system/fileSystemService';
import PathService from '../service/system/pathService';
import { IElectronWrapper, IFileSystem, IPath } from './interfaces';
import TYPES from './types';

const dependencyInjector = new Container({ defaultScope: 'Singleton' });
dependencyInjector.bind<IFileSystem>(TYPES.FileSystem).to(FileSystemService);
dependencyInjector.bind<IPath>(TYPES.Path).to(PathService);

dependencyInjector.bind<IElectronWrapper>(TYPES.ElectronWrapper).to(ElectronWrapperService);

export default dependencyInjector;
