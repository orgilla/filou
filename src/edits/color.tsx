import React from 'react';
import { createComponent, withTheme } from 'react-fela';
import { CompactPicker } from 'react-color';
import { getColor } from '@filou/core/colors-provider';

const Edit = createComponent(
  ({ custom }) => ({
    '> div > div:first-child': {
      display: 'none',
    },
    '& .ant-input': {
      height: 'auto',
      padding: 'initial',
      width: 'calc(100% - 5px) !important',
    },
    '& .flexbox-fix': {
      display: !custom && 'none !important',
    },
  }),
  withTheme(({ theme, value, colors = [], onChange, className, ...p }) => {
    const c = [
      ...(theme.colors || []).map(color => color[theme.palette]),
      ...(colors || []),
    ];

    return (
      <div className={className}>
        <CompactPicker
          className="ant-input"
          color={getColor(theme, value, theme.palette) || value || theme.color}
          colors={c.length ? c : undefined}
          onChange={({ hex }) => onChange(hex)}
          {...p}
        />
      </div>
    );
  }),
  ({ custom, ...p }) => Object.keys(p)
);
Edit.displayName = 'EditColor';
Edit.type = 'hex';
export default Edit;
