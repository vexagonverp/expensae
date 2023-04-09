import { Layout } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const { Header, Footer, Content } = Layout;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Layout style={{ minHeight: '100vh' }}>
      <Header>header</Header>
      <Content>
        <App />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Expensae ©2023 Created by Bao Thanh </Footer>
    </Layout>
  </React.StrictMode>
);
