import React from 'react';
import { createComponent } from 'react-fela';

export default createComponent(
  ({ theme }) => ({
    border: 0,
    fontWeight: 600,
    // color: theme.dark2,
    textAlign: 'center',
    marginY: theme.space1,
    position: 'relative'
  }),
  p => <select {...p} />,
  p => Object.keys(p)
);
