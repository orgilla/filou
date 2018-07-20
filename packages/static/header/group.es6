import React from 'react';
import { createComponent, ThemeProvider, withTheme } from 'react-fela';
import get from 'lodash/get';
import Item from './item';

const Backdrop = createComponent(({ theme, mega }) => ({
  position: 'absolute',
  left: `-${theme.space3}`,
  bottom: 0,
  transform: 'translateY(90%)',
  zIndex: 13,
  opacity: 0,
  transition: theme.transition,
  pointerEvents: 'none',
  width: 220,
  '> a': {
    marginY: 4,
    onAfter: {
      left: -theme.space3,
      maxWidth: '33%',
      transform: 'translateX(0)'
    }
  },
  paddingX: theme.space3,
  paddingY: theme.space2,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.inverted ? theme.color : theme.light,
  borderRadius: theme.borderRadius,
  boxShadow: theme.boxShadow,
  extend: mega
    ? {
        flexDirection: 'row',
        width: 800,
        left: '-200%',
        '> span': {
          marginX: theme.space1
        }
      }
    : {},
  ...get(theme, 'filou/static/HeaderMenu', {})
  // 'rgba(0, 0, 0, 0.0470588) 0px 1px 4px, rgba(0, 0, 0, 0.0470588) 0px 1px 3px'
}));

const Group = createComponent(
  () => ({
    position: 'relative',
    onHover: {
      '> div': {
        transform: 'translateY(100%)',
        pointerEvents: 'initial',
        opacity: 1
      }
    }
  }),
  ({ children, className, title, theme, inverted = theme.inverted, mega }) => (
    <Item nolink className={className} xy={console.log(mega)}>
      {title}
      <ThemeProvider theme={{ ...theme, inverted }}>
        <Backdrop mega={mega}>{children}</Backdrop>
      </ThemeProvider>
    </Item>
  ),
  p => Object.keys(p)
);

export default withTheme(Group);
