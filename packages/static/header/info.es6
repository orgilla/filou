import React from 'react';
import { createComponent } from 'react-fela';
import Header from './header';

const Info = createComponent(
  () => ({
    zIndex: 11,
    height: '100%'
  }),
  props => <Header {...props} />,
  p => Object.keys(p)
);

export default Info;
