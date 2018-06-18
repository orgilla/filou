import React from 'react';
import { createComponent } from 'react-fela';
import get from 'lodash/get';

const Info = createComponent(
  ({ theme, height }) => ({
    // backgroundImage,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color,
    opacity: 0.7,
    // position: 'absolute',
    width: '100%',
    height,
    // paddingX: 15,
    paddingX: 10,
    // borderBottom: '1px solid lightgray',
    ifSmallDown: {
      textAlign: 'center',
      '> div': {
        display: 'none'
      },
      '> a': {
        display: 'none'
      },
      '> span': {
        flex: 1
      }
    },
    '> a': {
      onHover: {
        color: 'white',
        opacity: 0.6,
        ...get(theme, 'filou/static/HeaderInfoLink', {})
      },
      color: 'white',
      // fontSize: 14,
      marginX: 15,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...get(theme, 'filou/static/HeaderInfoLink', {})
    },
    '> span': {
      ':last-child': {
        marginRight: 0
      },
      ':first-child': {
        marginLeft: 0
      },
      color: 'white',
      // fontSize: 14,
      marginX: 15,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '> a': {
        onHover: {
          color: 'white',
          opacity: 0.6,
          ...get(theme, 'filou/static/HeaderInfoLink', {})
        },
        marginX: 0,
        ...get(theme, 'filou/static/HeaderInfoLink', {})
      }
    },
    ...get(theme, 'filou/static.header.info', {}),
    ...get(theme, 'filou/static/HeaderInfo', {})
  }),
  ({ children, className }) => <div className={className}>{children}</div>,
  p => Object.keys(p)
);

export default Info;
