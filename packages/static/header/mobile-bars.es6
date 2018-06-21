import React, { Fragment } from 'react';
import { FaBars } from '@filou/icons';
import Tappable from 'react-tappable';
import { createComponent, ThemeProvider, withTheme } from 'react-fela';
import { withState } from 'recompose';
import Nav from '../nav';

const Bars = withState('nav', 'setNav', false)(
  createComponent(
    ({ theme }) => ({
      display: 'none',
      marginX: 0,
      ifSmallDown: {
        display: 'flex'
      },
      '& svg': {
        fill: theme.inverted ? theme.light : theme.linkColor
      }
    }),
    ({
      children,
      className,
      nav,
      setNav,
      theme,
      inverted = theme.inverted
    }) => (
      <Fragment>
        <ThemeProvider
          theme={{
            inverted
          }}
        >
          <Nav open={nav} onClose={() => setNav(!nav)}>
            {children}
          </Nav>
        </ThemeProvider>
        <Tappable className={className} onTap={() => setNav(true)}>
          <FaBars size={30} />
        </Tappable>
      </Fragment>
    ),
    p => Object.keys(p)
  )
);

export default withTheme(Bars);
