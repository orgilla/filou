import React from 'react';
import { Row, Col } from 'antd';
import { isBefore, endOfDay } from 'date-fns';
import EditDate from './date';

const Edit = ({ value = [], onChange, ...props }) => {
  const [start, end] = value;
  const endFn = isBefore(end, start) ? end || new Date() : start || new Date();

  return (
    <Row gutter={16}>
      <Col span={12}>
        <EditDate value={start} onChange={v => onChange([v, end])} {...props} />
      </Col>
      <Col span={12}>
        <EditDate
          value={start ? endFn : undefined}
          onChange={v => onChange([start, endOfDay(v)])}
          {...props}
        />
      </Col>
    </Row>
  );
};
Edit.displayName = 'EditDaterange';
Edit.type = 'array';
export default Edit;
