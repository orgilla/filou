import React from 'react';
import { createComponent } from 'react-fela';
import { Form } from 'antd';
import { layout } from './utils';

export default createComponent(
  ({ theme }) => ({
    marginBottom: theme.space2
  }),
  ({ layout: l = 'vertical', ...p }) => <Form.Item {...layout[l]} {...p} />,
  p => Object.keys(p)
);
