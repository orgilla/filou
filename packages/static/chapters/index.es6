import React, { Component, Fragment } from 'react';
// import Img from 'gatsby-image';
import { FaHashtag } from '@filou/icons';
import { createComponent } from 'react-fela';
import { withState, withPropsOnChange } from 'recompose';
import { StickyContainer, Sticky } from 'react-sticky';
import Nav from '../nav';
import createHash from '../create-hash';

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
        <Sticky disableCompensation>
          {props => (
            <HeadingsNonMobile
              paddingTop={headerHeight}
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
              paddingTop={headerHeight}
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
  ['container', 'distanceFromTop', 'paddingTop', 'double'],
  ({ container, distanceFromTop, paddingTop, double }) => ({
    element:
      container &&
      Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .filter(
          e =>
            e.offsetTop +
              distanceFromTop -
              e.offsetHeight -
              (double ? paddingTop : 0) <
            0
        )
        .reverse()[0]
  })
);

const HeadingsMobile = deco(
  withState('open', 'setOpen', false)(
    createComponent(
      ({ theme, styles, paddingTop }) => ({
        ...styles,
        zIndex: 13,
        top: paddingTop,
        overflow: 'hidden',
        height: 0,
        paddingY: 0,
        paddingLeft: 40,
        paddingRight: 10,
        display: 'flex',
        transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
        backgroundColor: 'rgb(85, 85, 85)',
        color: 'white',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow:
          styles.position === 'fixed'
            ? 'rgba(0, 0, 0, 0.0470588) 0px 1px 4px, rgba(0, 0, 0, 0.0470588) 0px 1px 3px'
            : undefined,
        '> h2': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: 'white',
          flex: 1,
          margin: 0
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
                to={`#${createHash(value)}`}
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
    ({ styles = {}, paddingTop }) => ({
      position: 'absolute',
      ...styles,
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
      // maxHeight: 500,
      // overflow: 'auto',
      width: 300,
      // backgroundColor: 'white',
      paddingTop: paddingTop + 30,
      paddingRight: 50,
      left: 'initial',
      right: '0px',
      // top: 50,
      // left: 30,
      // paddingLeft: 20,
      display: 'flex',
      flexDirection: 'column',
      transform: 'translateX(0)',
      transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
      ifMediumDown: {
        display: 'none',
        transform: 'translateX(200%)'
      }
    }),
    ({ headings, className, element }) => (
      <div className={className}>
        {headings.filter(x => x.value).map(({ value, depth }, i) => (
          <Nav.Item
            key={value + i}
            depth={depth}
            active={element && value === element.innerText}
            to={`#${createHash(value)}`}
          >
            {value}
          </Nav.Item>
        ))}
      </div>
    ),
    p => Object.keys(p)
  )
);

export default HeadingsContainer;
