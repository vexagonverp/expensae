import { Layout } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { REACT_ROUTE } from './constants';
import LoginRoute from './route/LoginRoute';
import SubmitFormRoute from './route/SubmitFormRoute';

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
            <Route path={REACT_ROUTE.SUBMIT_FORM} element={<SubmitFormRoute />} />
          </Routes>
        </Router>
      </Content>
    </Layout>
  </React.StrictMode>
);
