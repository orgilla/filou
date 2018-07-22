import React from 'react';
// import Img from 'gatsby-image';
import { FaHashtag } from '@filou/icons';
import { createComponent } from 'react-fela';
import { withState } from 'recompose';
import slugify from 'slugify';
import get from 'lodash/get';
import Nav from '../nav';

export default withState('open', 'setOpen', false)(
  createComponent(
    ({ theme, styles, top }) => ({
      ...styles,
      zIndex: 13,
      top,
      overflow: 'hidden',
      height: 0,
      paddingY: 0,
      paddingLeft: 40,
      paddingRight: 10,
      display: 'flex',
      transition: theme.transition,
      backgroundColor: 'rgb(85, 85, 85)',
      color: 'white',
      textAlign: 'center',
      cursor: 'pointer',
      boxShadow: styles.position === 'fixed' ? theme.boxShadow : undefined,
      '> h2': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: 'white',
        flex: 1,
        margin: 0,
        ...get(theme, 'filou/static/ChaptersLink', {})
      },
      ifMediumDown: {
        paddingY: 10,
        height: 'initial'
      }
    }),
    ({ headings, className, open, setOpen, element }) => (
      <div onClick={() => setOpen(!open)} className={className}>
        <h2>{element ? element.innerText : 'Kapitel zeigen'}</h2>
        <FaHashtag size={30} color="white" />
        <Nav inverted open={open} onClose={() => setOpen(false)}>
          {headings.filter(x => x.value).map(({ value }, i) => (
            <Nav.Item
              key={value + i}
              active={element && value === element.innerText}
              to={`#${slugify(value)}`}
            >
              {value}
            </Nav.Item>
          ))}
        </Nav>
      </div>
    ),
    p => Object.keys(p)
  )
);
