import React from 'react';
import { createComponent } from 'react-fela';
import { Link } from 'react-static';

const Logo = createComponent(
  ({ theme, sticky }) => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: -10,
    height: 56,
    transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
    textDecoration: 'none'
    // transform: sticky.isSticky ? 'scale(0.8) translateX(-26px)' : undefined
  }),
  ({ onClick, to, className, logo: RawLogo, logoText }) => (
    <Link to={to} onClick={onClick} className={className}>
      {typeof RawLogo === 'object' ? RawLogo : <RawLogo />}
      {logoText}
    </Link>
  ),
  p => Object.keys(p)
);
export default Logo;
