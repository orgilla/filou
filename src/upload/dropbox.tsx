import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';

export const retry = (func, amount = 20, interval = 250) =>
  new Promise((yay, nay) => {
    setTimeout(() => {
      if (func()) {
        yay();
      } else if (amount === 0) {
        nay();
      } else {
        return retry(func, amount - 1, interval);
      }
    }, interval);
  });

export default class Uploader extends Component {
  static defaultProps = {
    linkType: 'direct', // or "direct"
    multiselect: false, // or true
    folderselect: false, // or true
    onCancel: () => {},
    onChange: () => {},
    extensions: undefined
  };
  onClick = async () => {
    await retry(() => !!window.Dropbox);
    const {
      onChange,
      onCancel,
      linkType,
      multiselect,
      folderselect,
      extensions
    } = this.props;

    window.Dropbox.choose({
      extensions,
      linkType,
      multiselect,
      folderselect,
      success: onChange,
      cancel: onCancel
    });
  };
  render() {
    let { children } = this.props;
    if (typeof children === 'function') {
      children = children({ onClick: this.onClick });
    } else {
      children = <div onClick={this.onClick}>{children}</div>;
    }
    return (
      <Fragment>
        {children}
        <Helmet>
          <script
            type="text/javascript"
            src="https://www.dropbox.com/static/api/2/dropins.js"
            id="dropboxjs"
            data-app-key="c3p2qdebpns6z3t"
          />
        </Helmet>
      </Fragment>
    );
  }
}
