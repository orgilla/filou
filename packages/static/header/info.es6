import React from 'react';
import { createComponent, ThemeProvider, withTheme } from 'react-fela';
import Menu from './menu';

const Info = createComponent(
  ({ theme, height }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.inverted ? theme.color : theme.light,
    // opacity: 0.7,
    width: '100%',
    height,
    paddingX: 10,
    ifSmallDown: {
      textAlign: 'center',
      '> div': {
        display: 'none'
      },
      '> a': {
        display: 'none'
      },
      '> span': {
        flex: 1
      }
    },
    '> a': {
      marginX: 15
    },
    '> span': {
      marginX: 15,
      '> a': {
        marginX: 0
      }
    }
  }),
  ({ children, className }) => <Menu className={className}>{children}</Menu>,
  p => Object.keys(p)
);

export default withTheme(
  ({
    theme,
    inverted = theme.inverted,
    fontSize = theme.fontSize,
    fontWeight = theme.fontWeight,
    linkColor = theme.color,
    ...props
  }) => (
    <ThemeProvider
      theme={{
        inverted,
        fontSize: theme[fontSize] || fontSize || theme.fontSize,
        fontWeight: theme[fontWeight] || fontWeight || theme.fontWeight,
        linkColor: theme[linkColor] || linkColor || theme.color
      }}
    >
      <Info {...props} />
    </ThemeProvider>
  )
);
