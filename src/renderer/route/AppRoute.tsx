import { Button, Input, Space } from 'antd';

const AppRoute = () => (
  <Space.Compact style={{ width: '100%' }}>
    <Input defaultValue="Combine input and button" />
    <Button type="primary">Submit</Button>
  </Space.Compact>
);

export default AppRoute;
