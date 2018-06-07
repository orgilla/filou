import React from 'react';
import * as types from 'prop-types';
import get from 'lodash/get';

export default class LocaleProvider extends React.Component {
  static childContextTypes = {
    locale: types.func
  };

  getChildContext() {
    return {
      locale: this.caller
    };
  }

  caller = (fnOrString, ...rest) => {
    const { locale } = this.props;
    if (typeof fnOrString === 'function') {
      return fnOrString(...rest, { locale });
    } else if (typeof fnOrString === 'string') {
      return get(locale, fnOrString, ...rest);
    }
    return locale[fnOrString];
  };

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}
