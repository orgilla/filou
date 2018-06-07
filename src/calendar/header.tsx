import React from 'react';
import { createComponent } from 'react-fela';
import Field from './field';

export default createComponent(
  ({ theme }) => ({
    color: theme.dark3,
    fontSize: '85%'
  }),
  p => <Field isHeader {...p} />,
  p => Object.keys(p)
);
