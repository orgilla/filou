import React from 'react';
import { createComponent } from 'react-fela';

const Info = createComponent(
  ({ theme }) => ({
    // backgroundImage,
    display: 'flex',
    backgroundColor: theme.color,
    opacity: 0.7,
    // position: 'absolute',
    top: 0,
    width: '100%',
    left: 0,
    height: 25,
    // paddingX: 15,
    paddingTop: 4,
    paddingRight: 10,
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
        opacity: 0.6
      },
      color: 'white',
      fontSize: 14,
      marginX: 15,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '> span': {
      color: 'white',
      fontSize: 14,
      marginX: 15,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '> a': {
        onHover: {
          color: 'white',
          opacity: 0.6
        },
        marginX: 0
      }
    }
  }),
  ({ children, className }) => <div className={className}>{children}</div>,
  p => Object.keys(p)
);

export default Info;
