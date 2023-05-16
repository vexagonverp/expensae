import { Card, Calendar } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { CALENDER_YEAR_LIMIT } from '../constants';

const SelectFormIdRoute = () => {
  const { formId } = useParams();

  return (
    <Card title={formId}>
      <Calendar
        validRange={[
          dayjs().startOf('year').year(CALENDER_YEAR_LIMIT.MIN_YEAR),
          dayjs().startOf('year').year(CALENDER_YEAR_LIMIT.MAX_YEAR)
        ]}
      />
    </Card>
  );
};
export default SelectFormIdRoute;
