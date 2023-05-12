import { Card } from 'antd';
import { useParams } from 'react-router-dom';
import Calender from '../components/Calender';
import type {} from 'date-fns';

const SelectFormIdRoute = () => {
  const { formId } = useParams();

  return (
    <Card title={formId}>
      <Calender />
    </Card>
  );
};
export default SelectFormIdRoute;
