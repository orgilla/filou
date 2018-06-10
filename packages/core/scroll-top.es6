import React, { Component } from 'react';
import scrollparent from 'scrollparent';

export const scrollTopHelper = (node, func) => {
  const parent = scrollparent(node);

  let ticking = false;

  const update = () => {
    func(parent, () => {
      ticking = false;
    });
  };
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  };

  parent.addEventListener('scroll', requestTick, true);
  return () => parent.removeEventListener('scroll', requestTick);
};

export default ComposedComponent =>
  class ScrollDecorator extends Component {
    constructor() {
      super();

      // Initial scroll position
      this.state = {
        scrollPosition: this.getWindowScrollTop(),
      };

      // Bind handlers
      if (typeof window === 'undefined') {
        return;
      }
      this.handleInterval = this.handleInterval.bind(this);
      this.handleRequestAnimationFrame = this.handleRequestAnimationFrame.bind(
        this
      );
    }

    componentWillMount() {
      if (typeof window === 'undefined') {
        return;
      }
      // 50 times per second, change to your needs
      const INTERVAL = 20;
      this.intervalID = setInterval(this.handleInterval, INTERVAL);
    }

    componentWillUnmount() {
      if (typeof window === 'undefined') {
        return;
      }
      // Remove and reset interval/animationFrame
      clearInterval(this.intervalID);
      cancelAnimationFrame(this.requestID);
      this.requestID = null;
      this.intervalID = null;
    }

    getWindowScrollTop() {
      // Get scroll position, with IE fallback
      if (typeof window === 'undefined') {
        return 0;
      }
      return window.pageYOffset || document.documentElement.scrollTop;
    }

    handleInterval() {
      if (typeof window === 'undefined') {
        return;
      }
      // Interval is only used to throttle animation frame
      cancelAnimationFrame(this.requestID);
      this.requestID = requestAnimationFrame(this.handleRequestAnimationFrame);
    }

    handleRequestAnimationFrame() {
      if (typeof window === 'undefined') {
        return;
      }
      const { scrollPosition } = this.state;
      const newScrollPosition = this.getWindowScrollTop();

      // Update the state only when scroll position is changed
      if (newScrollPosition !== scrollPosition) {
        this.setState({
          scrollPosition: newScrollPosition,
        });
      }
    }

    render() {
      const { scrollPosition } = this.state;

      return <ComposedComponent {...this.props} scrollTop={scrollPosition} />;
    }
  };
