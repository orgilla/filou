import React from 'react';
import { createComponent } from 'react-fela';

const Menu = createComponent(
  () => ({
    '> *': {
      marginRight: 20,
      ':last-child': {
        marginRight: 0
      },
      ':first-child': {
        marginLeft: 0
      }
    },
    ifSmallDown: {
      display: 'none'
    },
    ifMediumDown: {
      '> *': {
        // fontSize: 14
      }
    }
  }),
  ({ children, className }) => <div className={className}>{children}</div>,
  p => Object.keys(p)
);

export default Menu;
