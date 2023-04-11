const ipcMsg = {
  RendererToMain: { LOGIN_REQUEST: 'LOGIN_REQUEST' },
  MainToRenderer: { LOGIN_SUCCESS: 'LOGIN_SUCCESS' },
  RendererMainRenderer: {}
};

export default ipcMsg;
