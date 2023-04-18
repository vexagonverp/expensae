import { Layout } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginRoute from './route/LoginRoute';

const { Header, Content } = Layout;
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginRoute />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Layout style={{ minHeight: '100vh' }}>
      <Header>header</Header>
      <Content>
        <RouterProvider router={router} />
      </Content>
    </Layout>
  </React.StrictMode>
);
