import React from 'react';
import { createComponent } from 'react-fela';
import ScrollTop from '../scroll-top-restoration';

const Layout = createComponent(
  () => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    // overflowX: 'hidden',
    minHeight: '100vh'
  }),
  ({ children, className }) => (
    <div className={className}>
      {children}
      <ScrollTop />
    </div>
  )
);

export default Layout;
