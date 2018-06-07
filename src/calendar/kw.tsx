import React from 'react';
import { createComponent } from 'react-fela';
import Header from './header';

export default createComponent(
  ({ theme }) => ({
    borderRight: `1px solid ${theme.dark4}`,
    borderRadius: 0
  }),
  p => <Header {...p} />,
  p => Object.keys(p)
);
