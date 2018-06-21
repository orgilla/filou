import React from 'react';
import { createComponent } from 'react-fela';
import { Link, Route } from 'react-static';
import get from 'lodash/get';

const func = () => ({});
const Item = createComponent(
  ({ theme, nolink, active, hideIfSmall, hideIfMini, hideIfMedium }) => ({
    fontSize: theme.fontSize,
    cursor: 'pointer',
    fontWeight: theme.fontWeight,
    color: theme.inverted ? theme.light : theme.linkColor,
    textDecoration: 'none',
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    position: 'relative',
    extend: [
      {
        condition: !nolink,
        style: {
          overflow: 'hidden'
        }
      },
      {
        condition: hideIfMini,
        style: {
          ifMini: {
            display: 'none'
          }
        }
      },
      {
        condition: hideIfMedium,
        style: {
          ifMediumDown: {
            display: 'none'
          }
        }
      },
      {
        condition: hideIfSmall,
        style: {
          ifSmallDown: {
            display: 'none'
          }
        }
      },
      {
        condition: active,
        style: theme.activeStyle || {
          ...get(theme, 'linkAnimation.active', func)(theme)
        }
      }
    ],
    minWidth: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    onHover: !nolink && {
      textDecoration: 'none',
      color: theme.inverted ? theme.light : theme.linkColor,
      opacity: 0.6,
      ...get(theme, 'linkAnimation.hover', func)(theme)
    },
    ...get(theme, 'linkAnimation.default', func)(theme)
  }),
  ({ children, onClick, to, className, nolink }) =>
    !nolink ? (
      <Link to={to} onClick={onClick} className={className}>
        {children}
      </Link>
    ) : (
      <span className={className}>{children}</span>
    ),
  p => Object.keys(p)
);

const ActiveItem = ({ to, exact, ...rest }) =>
  to ? (
    <Route path={to}>
      {({ location }) => {
        const active =
          to === '/' || exact
            ? location.pathname === to
            : location.pathname === to ||
              location.pathname.indexOf(`${to}/`) === 0;
        return <Item to={to} active={active} {...rest} />;
      }}
    </Route>
  ) : (
    <Item to={to} {...rest} />
  );

export default ActiveItem;
