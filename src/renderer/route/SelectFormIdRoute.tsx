import { Card, Calendar, Drawer, Form } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CALENDER_YEAR_LIMIT, DAYJS_CONST } from '../constants';

const SelectFormIdRoute = () => {
  const { formId } = useParams();
  const [openExpense, setOpenExpense] = useState(false);
  const [selectDate, setSelectDate] = useState(dayjs().format(DAYJS_CONST.DAYJS_FORMAT));
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
