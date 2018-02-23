import React, { cloneElement, Children } from 'react';
import { createComponent, ThemeProvider } from 'react-fela';
import useTheme from './theme';
import Header from './header';
import Divider from './divider';
import Image from './image';
import List from './list';
import Item from './item';
import Title from './title';
import Space from './space';
import Extra from './extra';
import Input from './input';

const Inner = createComponent(
  ({ overflowY = 'auto' }) => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    overflowY,
    overflowX: 'hidden'
    // justifyContent: 'space-between',
  }),
  'div',
  []
);

const Menu = createComponent(
  ({
    theme,
    color,
    paddingX = 9,
    paddingY = theme.space2,
    width,
    overflowY = 'auto',
    collapsed
  }) => ({
    display: 'flex',
    flexGrow: collapsed ? 0 : 1,
    flexDirection: 'column',
    width: width || '100%',
    maxWidth: width,
    minWidth: width,
    height: '100%',
    color: theme.inverted ? theme.light1 : theme.dark1,
    backgroundColor: color,
    paddingY,
    paddingX,
    overflowY,
    overflowX: 'hidden',
    transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)'
  }),
  ({
    className,
    children,
    color,
    inverted,
    header,
    headerColor,
    headerPaddingBottom,
    headerMarginBottom,
    headerInverted,
    overflowY,
    collapsed,
    ...p
  }) => (
    <div className={className} {...p}>
      {header && (
        <Header
          marginBottom={headerMarginBottom}
          paddingBottom={headerPaddingBottom}
          color={headerColor || color}
          collapsed={collapsed}
          inverted={headerInverted || inverted}
        >
          {header}
        </Header>
      )}
      <Inner overflowY={overflowY}>
        {Children.map(
          children,
          child => (child ? cloneElement(child, { collapsed }) : child)
        )}
      </Inner>
    </div>
  ),
  ({ paddingY, paddingX, ...p }) => Object.keys(p)
);

const Component = useTheme(
  ({ inverted, color, collapsed, theme, ...props }) => (
    <ThemeProvider theme={theme}>
      <Menu
        color={color}
        inverted={inverted}
        collapsed={collapsed}
        {...props}
      />
    </ThemeProvider>
  )
);

Component.Header = Header;
Component.Divider = Divider;
Component.Item = Item;
Component.List = List;
Component.Title = Title;
Component.Image = Image;
Component.Space = Space;
Component.Extra = Extra;
Component.Input = Input;
export default Component;
