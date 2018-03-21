import React from 'react';
import { ThemeProvider } from 'react-fela';
import materialColors from './colors-material';

const getTheme = (theme = {}, colors = materialColors, palette = 7) => ({
  colors: colors.map(color => color.palette),
  palette,
  ...theme
});

export const getColor = (theme, color, palette) =>
  theme[color] ||
  (!!theme.colors &&
    !!theme.colors[color] &&
    theme.colors[color][palette !== undefined ? palette : theme.palette]) ||
  (color === true && theme.color) ||
  color;

export default ({ theme, colors, palette, children }) => (
  <ThemeProvider theme={getTheme(theme, colors, palette)}>
    {children}
  </ThemeProvider>
);
