import React from 'react';
import { createComponent } from 'react-fela';
import { Container } from '@filou/core';

const OuterContainer = createComponent(
  ({ sticky = {}, theme, height, nested }) => ({
    ifMediumDown: nested && {
      display: 'none'
    },
    height: height || (nested ? '100%' : undefined),
    position: 'relative',
    width: nested ? undefined : '100%',
    ...sticky.style,
    boxShadow:
      sticky.isSticky && sticky.distanceFromTop !== 0
        ? theme.boxShadow
        : undefined,
    // paddingY: sticky.isSticky ? 0 : 10,
    // marginBottom: sticky.isSticky ? 20 : 0,
    transition: theme.transition,
    paddingX: nested ? undefined : theme.space2,
    // marginTop: sticky.isSticky ? 0 : 25,
    left: 0,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: nested
      ? undefined
      : !theme.inverted
        ? theme.light
        : theme.color,
    zIndex: 12
  }),
  ({ container, className, ...rest }) => (
    <div className={className}>
      {container ? <Container {...rest} /> : <div {...rest} />}
    </div>
  ),
  ['container']
);

const InnerContainer = createComponent(
  ({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '> *': {
      marginRight: theme.space3,
      ':last-child': {
        marginRight: 0
      },
      ':first-child': {
        marginLeft: 0
      }
    }
  }),
  ({ container, sticky, height, nested, ...rest }) => (
    <OuterContainer sticky={sticky} height={height} nested={nested}>
      {container ? <Container {...rest} /> : <div {...rest} />}
    </OuterContainer>
  ),
  ['container', 'height', 'nested', 'sticky']
);

export default InnerContainer;
