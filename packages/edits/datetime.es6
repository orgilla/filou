import React from 'react';
import { Row, Col } from 'antd';
import { format, addMilliseconds, startOfDay } from 'date-fns';
import EditTime, { getMilliseconds } from './time';
import EditDate from './date';

const Edit = ({ value, onChange, ...props }) => (
  <Row gutter={16}>
    <Col span={13}>
      <EditDate value={value} onChange={onChange} {...props} />
    </Col>
    <Col span={11}>
      <EditTime
        value={getMilliseconds(format(new Date(value), 'HH:mm'))}
        onChange={v =>
          onChange(addMilliseconds(startOfDay(new Date(value)), v))
        }
        {...props}
      />
    </Col>
  </Row>
);
Edit.displayName = 'EditDatetime';
Edit.type = 'date';
export default Edit;
