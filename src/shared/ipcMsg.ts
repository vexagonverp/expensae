const ipcMsg = {
  RendererToMain: { LOGIN_REQUEST: 'LOGIN_REQUEST' },
  MainToRenderer: { LOGIN_SUCCESS: 'LOGIN_SUCCESS' },
  RendererMainRenderer: { TOKEN_CHECK: 'TOKEN_CHECK', SHEET_ID: 'SHEET_ID' }
};

export default ipcMsg;
