import React from 'react';
import { Radio } from 'antd';

const Edit = ({ options, ...rest }) => (
  <Radio.Group style={{ width: '100%' }} {...rest}>
    {options.map(({ label, ...o }) => (
      <Radio key={o.value || label} {...o}>
        {label}
      </Radio>
    ))}
  </Radio.Group>
);
Edit.displayName = 'EditRadio';
Edit.type = 'string';
export default Edit;
