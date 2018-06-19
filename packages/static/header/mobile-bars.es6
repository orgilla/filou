import React, { Fragment } from 'react';
import { FaBars } from '@filou/icons';
import Tappable from 'react-tappable';
import { createComponent } from 'react-fela';
import { withState } from 'recompose';
import Nav from '../nav';

const Bars = withState('nav', 'setNav', false)(
  createComponent(
    ({ theme }) => ({
      display: 'none',
      ifSmallDown: {
        display: 'flex'
      },
      '& svg': {
        fill: theme.inverted ? theme.light : theme.dark
      }
    }),
    ({ children, className, nav, setNav }) => (
      <Fragment>
        <Nav open={nav} onClose={() => setNav(!nav)}>
          {children}
        </Nav>
        <Tappable className={className} onTap={() => setNav(true)}>
          <FaBars size={30} />
        </Tappable>
      </Fragment>
    ),
    p => Object.keys(p)
  )
);

export default Bars;
