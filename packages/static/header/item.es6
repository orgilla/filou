import React from 'react';
import { createComponent } from 'react-fela';
import { Link } from 'react-static';

const Item = createComponent(
  ({ theme, nolink }) => ({
    fontSize: theme.fontSize,
    cursor: 'pointer',
    fontWeight: theme.fontWeight,
    color: theme.inverted ? theme.light : theme.linkColor,
    textDecoration: 'none',
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    extend: !nolink && {
      overflow: 'hidden'
    },
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

export default Item;
