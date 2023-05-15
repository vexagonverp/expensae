import { Card, Calendar } from 'antd';
import { useParams } from 'react-router-dom';
import { CALENDER_YEAR_LIMIT } from '../constants';
import type { Dayjs } from 'dayjs';

const SelectFormIdRoute = () => {
  const { formId } = useParams();

  const disableYear = (date: Dayjs) => {
    const year = date.year();
    return year > CALENDER_YEAR_LIMIT.MAX_YEAR || year < CALENDER_YEAR_LIMIT.MIN_YEAR;
  };

  return (
    <Card title={formId}>
      <Calendar disabledDate={disableYear} />
    </Card>
  );
};
export default SelectFormIdRoute;
