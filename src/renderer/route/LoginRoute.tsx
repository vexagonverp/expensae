import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import ipcMsg from '../../shared/ipcMsg';

const LoginRoute = () => {
  const [authenticating, setAuthenticating] = useState(false);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const loginRequest = () => {
    setAuthenticating(true);
    window.ipcChannel.send(ipcMsg.RendererToMain.LOGIN_REQUEST);
  };

  useEffect(() => {
    window.ipcChannel.receive(ipcMsg.MainToRenderer.LOGIN_SUCCESS, () => {
      setAuthenticating(false);
      setIsAuthenticate(true);
    });
  });

  return (
    <Button
      type="primary"
      loading={authenticating}
      disabled={authenticating}
      icon={<GoogleOutlined />}
      onClick={loginRequest}
    >
      Login {isAuthenticate.toString()}
    </Button>
  );
};

export default LoginRoute;
