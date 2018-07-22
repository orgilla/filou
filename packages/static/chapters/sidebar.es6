import React from 'react';
// import Img from 'gatsby-image';
import { createComponent } from 'react-fela';
import slugify from 'slugify';
import get from 'lodash/get';
import Nav from '../nav';

export default createComponent(
  ({ theme, top }) => ({
    zIndex: 9,
    float: 'right',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top,
    animationName: {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    },
    animationDuration: '1.2s',
    animationTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    width: 200,
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    ifMediumDown: {
      display: 'none',
      transform: 'translateX(200%)'
    },
    '> a': {
      hyphens: 'auto',
      fontSize: 18,
      justifyContent: 'flex-end',
      textAlign: 'right',
      paddingX: 0,
      textDecoration: 'none',
      ...get(theme, 'filou/static/ChaptersLink', {})
    }
  }),
  ({ headings, className, element }) => (
    <div className={className}>
      {headings.filter(x => x.value).map(({ value, depth }, i) => (
        <Nav.Item
          key={value + i}
          depth={depth}
          active={element && value === element.innerText}
          to={`#${slugify(value)}`}
        >
          {value}
        </Nav.Item>
      ))}
    </div>
  ),
  p => Object.keys(p)
);
