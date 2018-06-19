import React from 'react';
import { createComponent, ThemeProvider, withTheme } from 'react-fela';

const Backdrop = createComponent(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: 20,
  paddingTop: 5,
  zIndex: 13,
  opacity: 0,
  transition: theme.transition,
  pointerEvents: 'none',
  width: 220,
  '> div': {
    '> a': {
      marginBottom: 4,
      marginTop: 4,
      onHover: {
        opacity: 0.7
      }
    },
    paddingX: 20,
    paddingY: 10,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.inverted ? theme.color : theme.light,
    borderRadius: theme.borderRadius,
    boxShadow: theme.boxShadow
    // 'rgba(0, 0, 0, 0.0470588) 0px 1px 4px, rgba(0, 0, 0, 0.0470588) 0px 1px 3px'
  }
}));

const Group = createComponent(
  () => ({
    position: 'relative',
    onHover: {
      '> div': {
        pointerEvents: 'initial',
        opacity: 1
      }
    }
  }),
  ({ children, className, title, theme, inverted = theme.inverted }) => (
    <span className={className}>
      {title}
      <ThemeProvider theme={{ inverted }}>
        <Backdrop>
          <div>{children}</div>
        </Backdrop>
      </ThemeProvider>
    </span>
  ),
  p => Object.keys(p)
);

export default withTheme(Group);
