import { FloatButton } from 'antd';

const { Group } = FloatButton;

const AppMenu = () => (
  <Group trigger="click" type="primary" style={{ right: 24 }}>
    <FloatButton />
    <FloatButton />
  </Group>
);

export default AppMenu;
