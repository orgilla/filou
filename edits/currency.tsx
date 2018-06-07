import React from 'react';
import { InputNumber } from 'antd';

const Edit = props => (
  <InputNumber
    formatter={value =>
      value || value === 0
        ? `${value} €`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        : value
    }
    parser={value => value.replace(/( €|€)\s?|(\.*)/g, '')}
    style={{ width: '100%' }}
    {...props}
  />
);
Edit.displayName = 'EditCurrency';
Edit.type = 'number';
export default Edit;
