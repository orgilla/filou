import React, { Fragment, cloneElement } from 'react';
import { createComponent } from 'react-fela';
import withStyle from 'filou/with-style';
import { withState, compose } from 'recompose';
import Swipeable from 'react-swipeable';
import { getColor } from '@filou/core/colors-provider';
import Portal from './portal';

export const Navigation = createComponent(
  ({ collapsed, width = 240, right }) => ({
    transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
    flex: 0,
    flexWidth: 72,
    height: '100%',
    position: 'relative',
    '> div': {
      transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
      zIndex: 5,
      position: 'absolute',
      right: right ? 0 : undefined,
      left: right ? undefined : 0,
      height: '100%',
      flexWidth: !collapsed ? width : 72,
    },
  }),
  ({ children, className, setCollapsed, right }) => (
    <div className={className}>
      <Swipeable
        onSwipedRight={() => (right ? setCollapsed(true) : setCollapsed(false))}
        onSwipedLeft={() => (right ? setCollapsed(false) : setCollapsed(true))}
        onMouseLeave={() => setCollapsed(true)}
        onMouseEnter={() => setCollapsed(false)}
      >
        {children}
      </Swipeable>
    </div>
  ),
  ['setCollapsed', 'right']
);

const enhance = compose(
  withState('collapsed', 'setCollapsed', true),
  withStyle(
    ({
      theme,
      color,
      palette,
      width = 312,
      right,
      left,
      open,
      fixed,
      inverted,
    }) => ({
      zIndex: 15,
      pointerEvents: 'initial',
      position: fixed ? 'fixed' : 'absolute',
      // position: flex ? 'absolute' : 'fixed',
      // top: 'env(safe-area-inset-top)',
      top: 0,
      height: '100%',
      '-webkit-overflow-scrolling': 'touch',
      bottom: 0,
      extend:
        right !== undefined
          ? {
              right: (right !== true && right) || 0,
              justifyContent: 'flex-end',
              transform: open ? null : 'translateX(101%)',
            }
          : {
              left: (left !== true && left) || 0,
              transform: open ? null : 'translateX(-101%)',
            },
      width,
      maxWidth: '100%',
      overflow: !open ? 'hidden' : 'auto',
      boxShadow: open ? theme.boxShadow : undefined,
      transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
      xy: console.log(inverted),
      backgroundColor: (inverted !== undefined
      ? !inverted
      : getColor(theme, color, palette) || theme.inverted)
        ? theme.light
        : theme.dark,
      // display: open ? 'flex' : 'none',
    })
  )
);

const Drawer = enhance(
  ({
    className,
    children,
    open,
    onClose,
    onClick,
    right,
    menu,
    setCollapsed,
    collapsed,
    width,
    fixed,
    ...rest
  }) => (
    <aside
      className={className}
      {...rest}
      onClick={e => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
    >
      {children}
      {menu && (
        <Navigation
          right={right}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        >
          {cloneElement(menu, { collapsed })}
        </Navigation>
      )}
    </aside>
  )
);

const Dimmer = createComponent(
  ({ theme, open, inverted, fixed, transparent }) => ({
    top: 0,
    bottom: 0,
    position: fixed ? 'fixed' : 'absolute',
    right: 0,
    left: 0,
    backgroundColor: transparent
      ? undefined
      : inverted
        ? theme.light2
        : theme.dark3,
    zIndex: 14,
    display: open ? undefined : 'none',
    opacity: !open ? 0 : 1,
    transition: 'opacity 200ms ease-out',
    pointerEvents: !open ? 'none' : undefined,
  }),
  'div',
  ['onClick']
);

export default ({
  dim = true,
  rootElement,
  children,
  className,
  onClose,
  ...props
}) => (
  <Portal open rootElement={rootElement}>
    <Fragment>
      <Dimmer {...props} transparent={dim === false} onClick={onClose} />
      <Drawer className={className} {...props}>
        {children}
      </Drawer>
    </Fragment>
  </Portal>
);
