import { ConfigProvider, Layout } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ipcMsg from '../shared/ipcMsg';
import AppMenu from './AppMenu';
import { REACT_ROUTE } from './constants';
import { unAuthorize } from './feature/auth/authSlice';
import { useAppSelector } from './hooks';
import LoginRoute from './route/LoginRoute';
import SelectFormIdRoute from './route/SelectFormIdRoute';
import SubmitFormRoute from './route/SubmitFormRoute';

const { Content } = Layout;

const AppRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.ipcChannel.receive(ipcMsg.MainToRenderer.SESSION_EXPIRED, () => {
      dispatch(unAuthorize());
      navigate(REACT_ROUTE.INDEX);
    });
  });

  return (
    <Routes>
      <Route path={REACT_ROUTE.INDEX} element={<LoginRoute />} />
      <Route path={REACT_ROUTE.SUBMIT_FORM} element={<SubmitFormRoute />} />
      <Route path={REACT_ROUTE.SELECT_FORM_ID} element={<SelectFormIdRoute />} />
    </Routes>
  );
};

const App = () => {
  const { isAuth } = useAppSelector((store) => store.auth);

  const AppMenuDisplay = useCallback(() => {
    if (isAuth) {
      return <AppMenu />;
    }
    return null;
  }, [isAuth]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#13C2C2'
        }
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <Router>
            <AppRoute />
          </Router>
          <AppMenuDisplay />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
