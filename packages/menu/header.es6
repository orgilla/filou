import React from 'react';
import { createComponent, ThemeProvider } from 'react-fela';
import { getColor } from '@filou/ui/colors-provider';
import useTheme from './theme';

const Header = createComponent(
  ({ theme, color, palette, marginBottom, paddingBottom }) => ({
    // height: 80,
    minHeight: 80,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    alignItems: 'center',
    fontSize: '120%',
    marginX: -9,
    paddingX: 9,
    marginTop: `-${theme.space2}`,
    paddingTop: theme.space2,
    marginBottom: marginBottom !== undefined ? marginBottom : theme.space2,
    paddingBottom: paddingBottom !== undefined ? paddingBottom : theme.space2,
    backgroundColor: getColor(theme, color, palette),
    color: theme.inverted ? theme.light : theme.dark,
    '& svg': {
      size: 40,
    },
    '& img': {
      size: 50,
      borderRadius: theme.borderRadius,
    },
  }),
  'div'
);

export default useTheme(({ inverted, color, theme, ...props }) => (
  <ThemeProvider theme={theme}>
    <Header color={color} {...props} />
  </ThemeProvider>
));
