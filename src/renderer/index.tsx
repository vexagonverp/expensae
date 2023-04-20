import { Layout } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { REACT_ROUTE } from './constants';
import AppRoute from './route/AppRoute';
import LoginRoute from './route/LoginRoute';

const { Header, Content } = Layout;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Layout style={{ minHeight: '100vh' }}>
      <Header>header</Header>
      <Content>
        <Router>
          <Routes>
            <Route path={REACT_ROUTE.INDEX} element={<LoginRoute />} />
            <Route path={REACT_ROUTE.APP} element={<AppRoute />} />
          </Routes>
        </Router>
      </Content>
    </Layout>
  </React.StrictMode>
);
