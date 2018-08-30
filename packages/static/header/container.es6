import React from 'react';
import { createComponent } from 'react-fela';
import { Container } from '@filou/core';

const OuterContainer = createComponent(
  ({ theme, sticky, height, nested, top, backgroundColor }) => ({
    ifMediumDown: nested && {
      display: 'none'
    },
    top,
    // overflowX: 'hidden',
    zIndex: sticky ? 12 : undefined,
    height: height || (nested ? '100%' : undefined),
    position: sticky ? 'sticky' : 'relative',
    width: nested ? undefined : '100%',
    /* boxShadow:
      sticky.isSticky && sticky.distanceFromTop !== 0
        ? theme.boxShadow
        : undefined, */
    // paddingY: sticky.isSticky ? 0 : 10,
    // marginBottom: sticky.isSticky ? 20 : 0,
    transition: theme.transition,
    paddingX: nested ? undefined : theme.space2,
    // marginTop: sticky.isSticky ? 0 : 25,
    left: 0,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor:
      backgroundColor && theme[backgroundColor]
        ? theme[backgroundColor]
        : backgroundColor ||
          (nested ? undefined : !theme.inverted ? theme.light : theme.color)
  }),
  ({ container, className, children, ...rest }) => (
    <div className={className}>
      {container ? <Container {...rest} /> : children}
    </div>
  ),
  ['container']
);

const InnerContainer = createComponent(
  ({ theme }) => ({
    flex: 1,
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    '> *': {
      marginRight: theme.space3,
      ':last-child': {
        marginRight: 0
      },
      ':first-child': {
        marginLeft: 0
      },
    },
    '> a': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }),
  ({ container, sticky, height, nested, top, backgroundColor, ...rest }) => (
    <OuterContainer
      sticky={sticky}
      height={height}
      top={top}
      nested={nested}
      backgroundColor={backgroundColor}
    >
      {container ? <Container {...rest} /> : <div {...rest} />}
    </OuterContainer>
  ),
  ['container', 'height', 'nested', 'sticky', 'top', 'backgroundColor']
);

export default InnerContainer;
