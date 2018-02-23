import React from 'react';
import { createComponent } from 'react-fela';
import Field from './field';

export default createComponent(
  ({ theme }) => ({
    color: theme.dark3,
    fontSize: '85%',
    borderRight: `1px solid ${theme.dark4}`,
    borderRadius: 0
  }),
  p => <Field isCaption {...p} />,
  p => Object.keys(p)
);
