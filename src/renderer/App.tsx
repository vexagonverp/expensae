import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import ipcMsg from '../shared/ipcMsg';

const App = () => {
  const [loading, setLoading] = useState(false);
  const loginRequest = () => {
    setLoading(true);
    window.ipcChannel.send(ipcMsg.RendererToMain.LOGIN_REQUEST);
  };

  useEffect(() => {
    window.ipcChannel.receive(ipcMsg.MainToRenderer.LOGIN_SUCCESS, () => {
      setLoading(false);
    });
  });

  return (
    <Button
      type="primary"
      loading={loading}
      disabled={loading}
      icon={<GoogleOutlined />}
      onClick={() => loginRequest()}
    >
      Login
    </Button>
  );
};

export default App;
