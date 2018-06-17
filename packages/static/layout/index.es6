import React from 'react';
import { createComponent } from 'react-fela';
import { StickyContainer } from 'react-sticky';

const Layout = createComponent(
  () => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }),
  ({ children, className }) => (
    <StickyContainer className={className}>{children}</StickyContainer>
  )
);

export default Layout;
