import React from 'react';
import { Select } from 'antd';

const Edit = ({ options, ...rest }) => (
  <Select style={{ width: '100%' }} {...rest}>
    {options.map(({ label, ...o }) => (
      <Select.Option key={o.value || label} {...o}>
        {label}
      </Select.Option>
    ))}
  </Select>
);
Edit.displayName = 'EditSelect';
Edit.type = 'string';
export default Edit;
