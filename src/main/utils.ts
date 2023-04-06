import path from 'path';
import { app } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer';

const isDebug = process.env.ELECTRON_ENV === 'debug';

function getAssetsPath(fileName: string) {
  if (process.env.NODE_ENV === 'production' && app.isPackaged === true) {
    return path.resolve(process.resourcesPath, 'assets', fileName);
  }
  if (process.env.NODE_ENV === 'production' && app.isPackaged === false) {
    return path.resolve(__dirname, '../../../assets', fileName);
  }
  return path.resolve(__dirname, '../../../assets', fileName);
}

function getExtraPath() {
  if (process.env.NODE_ENV === 'production' && app.isPackaged === true) {
    return path.resolve(process.resourcesPath, 'extra');
  }
  if (process.env.NODE_ENV === 'production' && app.isPackaged === false) {
    return path.resolve(__dirname, '../../../extra');
  }
  return path.resolve(__dirname, '../../../extra');
}

function getHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const url = `http://localhost:${import.meta.env.VITE_PORT}`;
    return url;
  }
  return `file://${path.resolve(__dirname, `../renderer/${htmlFileName}`)}`;
}

function getPreloadPath(Name: string) {
  if (process.env.NODE_ENV === 'development') {
    return path.resolve(__dirname, '../../dist/preload', Name);
  }
  return path.resolve(__dirname, '../preload', Name);
}

function getWorkerPath(Name: string) {
  if (process.env.NODE_ENV === 'development') {
    return path.resolve(__dirname, '../../dist/worker', Name);
  }
  return path.resolve(__dirname, '../worker', Name);
}

function installExtensions() {
  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
  extensions.forEach((Name) => {
    installExtension(Name) // eslint-disable-next-line no-console
      .then((name) => console.log(`${name} Extension Added`))
      // eslint-disable-next-line no-console
      .catch((err) => console.log('An error occurred: ', err));
  });
}

export {
  isDebug,
  getAssetsPath,
  getExtraPath,
  getHtmlPath,
  getPreloadPath,
  installExtensions,
  getWorkerPath
};
