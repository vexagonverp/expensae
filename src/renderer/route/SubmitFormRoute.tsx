import { Button, Form, Input, Space } from 'antd';
import { useState } from 'react';
import ipcMsg from '../../shared/ipcMsg';
import { SheetPayload } from '../interfaces';

const enum ItemStatusState {
  BLANK = '',
  SUCCESS = 'success',
  VALIDATING = 'validating',
  ERROR = 'error'
}
const SubmitFormRoute = () => {
  const [form] = Form.useForm();
  const [itemStatus, setItemStatus] = useState(ItemStatusState.BLANK);
  const onFinish = (payload: SheetPayload) => {
    setItemStatus(ItemStatusState.VALIDATING);
    window.ipcChannel.sendAndReceive(ipcMsg.RendererMainRenderer.SHEET_ID, payload);
  };
  const { Item } = Form;
  const { Compact } = Space;
  return (
    <Compact style={{ width: '100%' }}>
      <Form form={form} onFinish={onFinish}>
        <Item
          name="sheetId"
          label="Google sheet's Id"
          rules={[{ required: true }]}
          hasFeedback
          validateStatus={itemStatus}
        >
          <Input />
        </Item>
        <Item shouldUpdate>
          {({ getFieldsValue }) => {
            const { sheetId } = getFieldsValue();
            const formIsComplete = sheetId;
            return (
              <Button type="primary" htmlType="submit" disabled={!formIsComplete}>
                Submit
              </Button>
            );
          }}
        </Item>
      </Form>
    </Compact>
  );
};

export default SubmitFormRoute;
