import React, { Component, Fragment } from 'react';
// import Img from 'gatsby-image';
import { FaHashtag } from '@filou/icons';
import { createComponent } from 'react-fela';
import { withState, withPropsOnChange } from 'recompose';
import { StickyContainer, Sticky } from 'react-sticky';
import slugify from 'slugify';
import get from 'lodash/get';
import Nav from '../nav';

class HeadingsContainer extends Component {
  render() {
    const { headings, children, headerHeight = 56 } = this.props;
    if (!headings || headings.length < 2) {
      return <Fragment>{children}</Fragment>;
    }
    return (
      <StickyContainer
        ref={ref => {
          this.ref = ref && ref.node;
        }}
      >
        <Sticky topOffset={0}>
          {props => (
            <HeadingsNonMobile
              top={headerHeight}
              double
              container={this.ref}
              styles={props.style}
              distanceFromTop={props.distanceFromTop}
              headings={headings}
            />
          )}
        </Sticky>
        <Sticky topOffset={-headerHeight}>
          {props => (
            <HeadingsMobile
              top={headerHeight}
              container={this.ref}
              styles={props.style}
              distanceFromTop={props.distanceFromTop}
              headings={headings}
            />
          )}
        </Sticky>
        {children}
      </StickyContainer>
    );
  }
}

const deco = withPropsOnChange(
  ['container', 'distanceFromTop', 'top', 'double'],
  ({ container, distanceFromTop, top, double }) => ({
    element:
      container &&
      Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .filter(
          e =>
            e.offsetTop +
              distanceFromTop -
              e.offsetHeight -
              (double ? top : 0) <
            0
        )
        .reverse()[0]
  })
);

const HeadingsMobile = deco(
  withState('open', 'setOpen', false)(
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
  )
);
const HeadingsNonMobile = deco(
  createComponent(
    ({ styles = {}, top, theme }) => ({
      ...styles,
      zIndex: 9,
      height: 0,
      '> div': {
        top,
        position: 'absolute',
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
        width: 300,
        paddingRight: 50,
        left: 'initial',
        right: '0px',
        display: 'flex',
        flexDirection: 'column',
        transform: 'translateX(0)',
        transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
        ifMediumDown: {
          display: 'none',
          transform: 'translateX(200%)'
        },
        '> a': {
          textDecoration: 'none',
          ...get(theme, 'filou/static/ChaptersLink', {})
        }
      }
    }),
    ({ headings, className, element }) => (
      <div className={className}>
        <div>
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
      </div>
    ),
    p => Object.keys(p)
  )
);

export default HeadingsContainer;
