import { Button, Form, Input, Divider } from 'antd';
import { useState } from 'react';
import ipcMsg from '../../shared/ipcMsg';
import { ISheetPayload } from '../../shared/payloadInterface';

const enum ItemStatusState {
  BLANK = '',
  SUCCESS = 'success',
  VALIDATING = 'validating',
  ERROR = 'error'
}
const SubmitFormRoute = () => {
  const [form] = Form.useForm();
  const [itemStatus, setItemStatus] = useState(ItemStatusState.BLANK);
  const onFinish = (payload: ISheetPayload) => {
    setItemStatus(ItemStatusState.VALIDATING);
    window.ipcChannel
      .sendAndReceive(ipcMsg.RendererMainRenderer.SHEET_ID, payload)
      ?.then(() => {
        setItemStatus(ItemStatusState.SUCCESS);
      })
      .catch(() => {
        setItemStatus(ItemStatusState.ERROR);
      });
  };

  const { Item } = Form;

  return (
    <Form form={form} onFinish={onFinish}>
      <Divider orientation="left">Create expenses sheet</Divider>
      <Item shouldUpdate>
        {() => {
          const formIsComplete = itemStatus !== ItemStatusState.VALIDATING;
          return (
            <Button type="primary" htmlType="submit" disabled={!formIsComplete}>
              Create new sheet
            </Button>
          );
        }}
      </Item>
      <Divider orientation="left">or import existing sheet</Divider>
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
          const formIsComplete = sheetId && itemStatus !== ItemStatusState.VALIDATING;
          return (
            <Button type="primary" htmlType="submit" disabled={!formIsComplete}>
              Submit
            </Button>
          );
        }}
      </Item>
    </Form>
  );
};

export default SubmitFormRoute;
