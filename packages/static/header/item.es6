import React from 'react';
import { createComponent } from 'react-fela';
import { Link } from 'react-static';

const Item = createComponent(
  ({ theme }) => ({
    fontSize: theme.fontSize,
    cursor: 'pointer',
    fontWeight: theme.fontWeight,
    color: theme.inverted ? theme.light : theme.linkColor,
    textDecoration: 'none',
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    onHover: {
      textDecoration: 'none',
      color: theme.inverted ? theme.light : theme.linkColor,
      opacity: 0.6
    }
  }),
  ({ children, onClick, to, className }) => (
    <Link to={to} onClick={onClick} className={className}>
      {children}
    </Link>
  ),
  p => Object.keys(p)
);

export default Item;
