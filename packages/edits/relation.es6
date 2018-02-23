import React from 'react';
import { Select } from 'antd';

const Edit = ({ data, items, children, value, onChange, mode, ...rest }) =>
  items && items.length ? (
    <Select
      value={value}
      onChange={val =>
        mode === 'tags' && Array.isArray(val)
          ? onChange(val.map(id => items.find(i => i.id === id)))
          : onChange(val)
      }
      mode={mode}
      {...rest}
      style={{ width: '100%' }}
    >
      {items.map(item => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <Select {...rest} disabled />
  );
Edit.displayName = 'EditRelation';
Edit.type = 'string';
export default Edit;
