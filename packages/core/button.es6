import React from 'react';
import { createComponent } from 'react-fela';
import { FaPencil } from '@filou/icons';
// import { Link } from '@powr/router';
const Link = () => null;

const Button = createComponent(
  ({ theme, size = 30 }) => ({
    borderRadius: '50%',
    backgroundColor: theme.color,
    width: size,
    height: size,
    color: theme.light,
    '> svg': {
      fill: theme.light,
      stroke: theme.light,
    },
    '> *': {
      center: true,
    },
  }),
  ({ className, children, to, updateQuery }) => (
    <Link updateQuery={updateQuery} to={to}>
      <div className={className}>{children}</div>
    </Link>
  ),
  ['className', 'to', 'updateQuery']
);

Button.Edit = props => (
  <Button {...props}>
    <FaPencil size={12} />
  </Button>
);

export default Button;
