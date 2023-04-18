import { Layout } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
            <Route path="/" element={<LoginRoute />} />
          </Routes>
        </Router>
      </Content>
    </Layout>
  </React.StrictMode>
);
