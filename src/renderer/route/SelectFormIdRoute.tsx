import { Card } from 'antd';
import { useParams } from 'react-router-dom';
import Calender from '../components/Calender';
import type {} from 'date-fns';
import { CALENDER_YEAR_LIMIT } from '../constants';

const SelectFormIdRoute = () => {
  const { formId } = useParams();

  const disableYear = (date: Date) => {
    const year = date.getFullYear();
    return year > CALENDER_YEAR_LIMIT.MAX_YEAR || year < CALENDER_YEAR_LIMIT.MIN_YEAR;
  };

  return (
    <Card title={formId}>
      <Calender disabledDate={disableYear} />
    </Card>
  );
};
export default SelectFormIdRoute;
