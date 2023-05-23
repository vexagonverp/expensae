import { sheets_v4 } from '@googleapis/sheets';
import { Card, Calendar, Drawer, Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { CellRenderInfo } from 'rc-picker/lib/interface';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ipcMsg from '../../shared/ipcMsg';
import { CALENDER_YEAR_LIMIT, DAYJS_CONST } from '../constants';

const SelectFormIdRoute = () => {
  const { formId } = useParams();
  const [openExpense, setOpenExpense] = useState(false);
  const [selectDate, setSelectDate] = useState(dayjs().format(DAYJS_CONST.DAYJS_FORMAT));
  const initExpense: unknown[] = [];
  const [expenseData, setExpenseData] = useState(initExpense);
  const [form] = Form.useForm();

  const onClose = () => {
    setOpenExpense(false);
    form.submit();
  };

  const onSelectDate = (date: dayjs.Dayjs) => {
    setSelectDate(date.format(DAYJS_CONST.DAYJS_FORMAT));
    // eslint-disable-next-line no-console
    console.log(
      date.diff(
        dayjs()
          .startOf('year')
          .year(Math.floor(date.year() / 10) * 10),
        'day'
      )
    );
    setOpenExpense(true);
  };

  const dateCellRender = (value: Dayjs) => {
    const row = value.diff(
      dayjs()
        .startOf('year')
        .year(Math.floor(value.year() / 10) * 10),
      'day'
    );
    return expenseData[row] ? expenseData[row] : null;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cellRenderer = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  useEffect(() => {
    const beginingYear = Math.floor(dayjs().year() / 10) * 10;
    window.ipcChannel
      .sendAndReceive(
        ipcMsg.RendererMainRenderer.SHEET_VALUE,
        `${beginingYear}-${beginingYear + 9}`,
        beginingYear,
        formId
      )
      ?.then((result: sheets_v4.Schema$ValueRange) => {
        if (result.values) setExpenseData(result.values);
      });
  });

  return (
    <Card title={formId}>
      <Calendar
        validRange={[
          dayjs().startOf('year').year(CALENDER_YEAR_LIMIT.MIN_YEAR),
          dayjs().startOf('year').year(CALENDER_YEAR_LIMIT.MAX_YEAR)
        ]}
        onSelect={onSelectDate}
      />
      <Drawer
        title={`Expenses of: ${selectDate}`}
        placement="bottom"
        onClose={onClose}
        open={openExpense}
      >
        <Form form={form}>{/* Any input */}</Form>
      </Drawer>
    </Card>
  );
};
export default SelectFormIdRoute;
