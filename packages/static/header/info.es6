import React from 'react';
import { createComponent } from 'react-fela';
import Header from './header';

const Info = createComponent(
  () => ({
    zIndex: 11,
    ifSmallDown: {
      textAlign: 'center',
      '> *:not(:first-child)': {
        display: 'none'
      },
      '> *:first-child': {
        flex: 1,
        marginX: 0
      }
    }
  }),
  props => <Header {...props} />,
  p => Object.keys(p)
);

export default Info;
