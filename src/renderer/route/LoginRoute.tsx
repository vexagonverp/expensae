import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ipcMsg from '../../shared/ipcMsg';
import { REACT_ROUTE } from '../constants';
import { authorize } from '../feature/auth/authSlice';

const LoginRoute = () => {
  const [authenticating, setAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginRequest = () => {
    setAuthenticating(true);
    window.ipcChannel.send(ipcMsg.RendererToMain.LOGIN_REQUEST);
  };

  useEffect(() => {
    window.ipcChannel.receive(ipcMsg.MainToRenderer.LOGIN_SUCCESS, () => {
      setAuthenticating(false);
      navigate(REACT_ROUTE.SUBMIT_FORM);
      dispatch(authorize());
    });
    window.ipcChannel.sendAndReceive(ipcMsg.RendererMainRenderer.TOKEN_CHECK)?.then((result) => {
      if (result) {
        navigate(REACT_ROUTE.SUBMIT_FORM);
        dispatch(authorize());
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
