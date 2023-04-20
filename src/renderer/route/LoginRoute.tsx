import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ipcMsg from '../../shared/ipcMsg';
import { REACT_ROUTE } from '../constants';

const LoginRoute = () => {
  const [authenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();
  const loginRequest = () => {
    setAuthenticating(true);
    window.ipcChannel.send(ipcMsg.RendererToMain.LOGIN_REQUEST);
  };

  useEffect(() => {
    window.ipcChannel.receive(ipcMsg.MainToRenderer.LOGIN_SUCCESS, () => {
      setAuthenticating(false);
      navigate(REACT_ROUTE.APP);
    });
    window.ipcChannel.sendAndReceive(ipcMsg.RendererMainRenderer.TOKEN_CHECK)?.then((result) => {
      if (result) {
        navigate(REACT_ROUTE.APP);
      }
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
      Login
    </Button>
  );
};

export default LoginRoute;
