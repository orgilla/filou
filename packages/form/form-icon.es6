import React from 'react';
import { Icon } from 'antd';
import { createComponent } from 'react-fela';

export default createComponent(
  ({ theme, onClick, isActive = true, type }) => ({
    color:
      type === 'loading' || (onClick && isActive) ? theme.color : theme.dark3,
    cursor: onClick && 'pointer',
    onHover: {
      opacity: onClick && isActive && 0.8
    }
  }),
  p => <Icon {...p} />,
  ({ isActive, ...p }) => Object.keys(p)
);
