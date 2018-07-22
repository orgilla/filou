import React, { Component, Fragment } from 'react';
import { withPropsOnChange } from 'recompose';
import { StickyContainer, Sticky } from 'react-sticky';
import Sidebar from './sidebar';
import Mobile from './mobile';

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
const DecoSidebar = deco(Sidebar);
const DecoMobile = deco(Mobile);

class HeadingsContainer extends Component {
  render() {
    const { headings, children, headerHeight = 56 } = this.props;
    if (!headings || headings.length < 2) {
      return <Fragment>{children}</Fragment>;
    }
    return (
      <Fragment>
        <DecoSidebar
          top={headerHeight}
          double
          container={this.ref}
          headings={headings}
        />
        {children}
      </Fragment>
    );
    return (
      <StickyContainer
        ref={ref => {
          this.ref = ref && ref.node;
        }}
      >
        <Sticky topOffset={0}>
          {props => (
            <DecoSidebar
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
            <DecoMobile
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

export default HeadingsContainer;
