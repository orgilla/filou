import React, { Component } from 'react';
import { createComponent } from 'react-fela';
import { shallowEqual } from 'recompose';

const SlideIn = createComponent(
  ({ isBack }) => ({
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    flexGrow: 1,
    display: 'flex',
    overflowX: 'hidden',
    transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
    '> :nth-child(1)': {
      zIndex: 0,
      position: 'absolute',
      top: 0,
      left: 0
    },
    '> :nth-child(2)': {
      position: 'absolute',
      zIndex: 1,
      animationDuration: '200ms',
      animationTimingFunction: 'ease-out',
      animationName: {
        '0%': {
          transform: isBack ? 'translateX(-101%)' : 'translateX(100%)'
        },
        '100%': {
          transform: 'translateX(0)'
        }
      }
    }
  }),
  'div',
  ({ isBack, ...p }) => Object.keys(p)
);

export default class StackedMenu extends Component {
  componentWillReceiveProps(newProps) {
    if (!shallowEqual(newProps.keys, this.props.keys)) {
      this.isBack = newProps.keys.length < this.props.keys.length;
      this.oldKeys = this.props.keys;
    }
  }
  render() {
    const { isLoading, renderMenu, keys, children } = this.props;

    if (!isLoading && renderMenu) {
      return (
        <SlideIn isBack={this.isBack}>
          {this.oldKeys && renderMenu(this.oldKeys)}
          {renderMenu(keys, this.oldKeys)}
        </SlideIn>
      );
    } else if (isLoading && this.oldKeys) {
      return <SlideIn isBack={this.isBack}>{renderMenu(this.oldKeys)}</SlideIn>;
    }

    return <SlideIn isBack={this.isBack}>{children}</SlideIn>;
  }
}
