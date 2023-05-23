const ipcMsg = {
  RendererToMain: { LOGIN_REQUEST: 'LOGIN_REQUEST' },
  MainToRenderer: { LOGIN_SUCCESS: 'LOGIN_SUCCESS', SESSION_EXPIRED: 'SESSION_EXPIRED' },
  RendererMainRenderer: {
    TOKEN_CHECK: 'TOKEN_CHECK',
    SHEET_ID: 'SHEET_ID',
    SHEET_VALUE: 'SHEET_VALUE'
  }
};

export default ipcMsg;
