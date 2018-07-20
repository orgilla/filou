import React, { Fragment } from 'react';
import { FaBars } from '@filou/icons';
import { createComponent, ThemeProvider, withTheme } from 'react-fela';
import { withState } from 'recompose';
import Nav from '../nav';

const Bars = withState('nav', 'setNav', false)(
  createComponent(
    ({ theme }) => ({
      display: 'none',
      marginX: 0,
      ifMediumDown: {
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
        <div className={className} onClick={() => setNav(true)}>
          <FaBars size={30} />
        </div>
      </Fragment>
    ),
    p => Object.keys(p)
  )
);

export default withTheme(Bars);
