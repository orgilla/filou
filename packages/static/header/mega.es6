import React from 'react';
import { createComponent, ThemeProvider, withTheme } from 'react-fela';
import get from 'lodash/get';
import { Container } from '@filou/core';
import Item from './item';

const Backdrop = createComponent(({ theme, height }) => ({
  position: 'fixed',
  top: height,
  left: 0,
  // height: 25,
  transition: `${theme.transition}`,
  // transitionDelay: '0.2s',
  pointerEvents: 'none',
  // transitionDuration: '0.1s',
  width: '100%',
  // marginY: `-${theme.space2}`,
  backgroundColor: theme.inverted ? theme.color : theme.light,
  zIndex: -1,
  opacity: 0,
  transform: `translateY(-${theme.space3})`,
  // pointerEvents: 'none',
  onBefore: {
    zIndex: 0,
    content: '""',
    position: 'absolute',
    top: -20,
    bottom: -30,
    left: 0,
    width: '100%'
  },
  '> div > a': {
    marginLeft: theme.space3
  },
  '> div > span': {
    marginLeft: theme.space3
  },
  '> div': {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'flex'
  },
  ...get(theme, 'filou/static/HeaderMenu', {})
}));

const Group = createComponent(
  () => ({
    position: 'relative',
    onHover: {
      '> div': {
        zIndex: 14,
        transitionDelay: '0s',
        transform: 'translateY(0)',
        pointerEvents: 'initial',
        opacity: 1
      }
    }
  }),
  ({
    children,
    className,
    title,
    theme,
    inverted = theme.inverted,
    height
  }) => (
    <Item nolink className={className}>
      {title}
      <ThemeProvider theme={{ ...theme, inverted }}>
        <Backdrop height={height}>
          <Container>{children}</Container>
        </Backdrop>
      </ThemeProvider>
    </Item>
  ),
  p => Object.keys(p)
);

export default withTheme(Group);
