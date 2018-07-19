import React from 'react';
import { createComponent } from 'react-fela';
import LinkConsumer from '../link';

const LogoInner = ({ onClick, to, className, logo: RawLogo, logoText }) => (
  <LinkConsumer>
    {Link => (
      <Link to={to} onClick={onClick} className={className}>
        {typeof RawLogo === 'object' ? RawLogo : <RawLogo key="logo" />}
        {/*logoText && <span>{logoText}</span>*/}
      </Link>
    )}
  </LinkConsumer>
);
const Logo = createComponent(
  () => ({
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    height: '100%',
    '> svg': {
      // height: '100%',
      width: 'auto'
    },
    // marginLeft: -10,
    // height: 56,
    transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
    textDecoration: 'none'
    // transform: sticky.isSticky ? 'scale(0.8) translateX(-26px)' : undefined
  }),
  LogoInner,
  p => Object.keys(p)
);
export default Logo;
