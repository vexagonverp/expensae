import { Layout } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const { Header, Content } = Layout;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Layout style={{ minHeight: '100vh' }}>
      <Header>header</Header>
      <Content>
        <App />
      </Content>
    </Layout>
  </React.StrictMode>
);
