import React from 'react';
import { createComponent } from 'react-fela';
import Image from './image';

export default createComponent(
  ({ theme, collapsed }) => ({
    color: theme.inverted ? theme.light2 : theme.dark2,
    ellipsis: true,
    textTransform: 'uppercase',
    fontSize: theme.fontSizeSmall,
    marginTop: theme.space2,
    marginBottom: theme.space1,
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    opacity: collapsed ? 0 : 1,
    transition: 'opacity 200ms ease-in-out',
    userSelect: 'none'
  }),
  ({ extra, children, ...p }) => (
    <div {...p}>
      {children}
      {!!extra && <Image extra>{extra}</Image>}
    </div>
  ),
  ({ collapsed, ...p }) => Object.keys(p)
);
