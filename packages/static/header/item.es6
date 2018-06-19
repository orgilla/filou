import React from 'react';
import { createComponent } from 'react-fela';
import { Link, Route } from 'react-static';

const Item = createComponent(
  ({ theme, nolink, active }) => ({
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
        condition: active,
        style: theme.activeStyle || {
          onAfter: {
            content: "''",
            width: '100%',
            position: 'absolute',
            left: 0,
            bottom: 0,
            borderBottom: `3px solid ${
              theme.inverted ? theme.light : theme.color
            }`
          }
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
      opacity: 0.6
    }
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

export default ({ to, ...rest }) =>
  to ? (
    <Route path={to} exact={to === '/'}>
      {({ match }) => <Item to={to} active={match} {...rest} />}
    </Route>
  ) : (
    <Item to={to} {...rest} />
  );
