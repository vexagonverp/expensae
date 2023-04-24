import { Button, Form, Input, Space } from 'antd';
import ipcMsg from '../../shared/ipcMsg';
import { SheetPayload } from '../interfaces';

const SubmitFormRoute = () => {
  const [form] = Form.useForm();
  const onFinish = (payload: SheetPayload) => {
    window.ipcChannel.sendAndReceive(ipcMsg.RendererMainRenderer.SHEET_ID, payload);
  };
  const { Item } = Form;
  return (
    <Space.Compact style={{ width: '100%' }}>
      <Form form={form} onFinish={onFinish}>
        <Item name="sheetId" label="Google sheet's Id" rules={[{ required: true }]}>
          <Input />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </Space.Compact>
  );
};

export default SubmitFormRoute;
