import React from 'react';
import { createComponent } from 'react-fela';
import { StickyContainer } from 'react-sticky';
import ScrollTop from '../scroll-top-restoration';

const Layout = createComponent(
  () => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }),
  ({ children, className }) => (
    <StickyContainer className={className}>
      {children}
      <ScrollTop />
    </StickyContainer>
  )
);

export default Layout;
