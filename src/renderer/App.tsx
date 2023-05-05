import { Layout } from 'antd';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AppMenu from './AppMenu';
import { REACT_ROUTE } from './constants';
import LoginRoute from './route/LoginRoute';
import SubmitFormRoute from './route/SubmitFormRoute';

const { Content } = Layout;
const App = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Content>
      <Router>
        <Routes>
          <Route path={REACT_ROUTE.INDEX} element={<LoginRoute />} />
          <Route element={<AppMenu />}>
            <Route path={REACT_ROUTE.SUBMIT_FORM} element={<SubmitFormRoute />} />
          </Route>
        </Routes>
      </Router>
    </Content>
  </Layout>
);

export default App;
