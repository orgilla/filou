import React, { Component } from 'react';
import HistoryConsumer from './history';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.pathname !== prevProps.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default () => (
  <HistoryConsumer>
    {History => (
      <History>{({ pathname }) => <ScrollToTop pathname={pathname} />}</History>
    )}
  </HistoryConsumer>
);
