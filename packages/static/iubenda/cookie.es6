import React, { Component } from 'react';

export class IubendaCookie extends Component {
  componentDidMount() {
    const d = document;
    const s = d.createElement('script');
    const tag = d.getElementsByTagName('script')[0];
    s.src = 'https://cdn.iubenda.com/iubenda.js';
    tag.parentNode.insertBefore(s, tag);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { iubendaPolicyId } = this.props;
    return (
      <a
        href={`https://www.iubenda.com/privacy-policy/${iubendaPolicyId}/cookie-policy`}
        className="no-brand iubenda-embed"
        title="Cookies"
      >
        Cookies
      </a>
    );
  }
}

export default IubendaCookie;
