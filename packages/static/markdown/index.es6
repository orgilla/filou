import React, { Component, createElement } from 'react';
import astToReact2 from 'react-markdown/lib/ast-to-react';
import { createComponent } from 'react-fela';
import renderers2 from 'react-markdown/lib/renderers';
import createHash from '../create-hash';
import getImg from '../get-img';

renderers2.link = class MDLink extends Component {
  render() {
    const { children, ...rest } = this.props;
    console.log(children);
    if (
      children &&
      children.length &&
      children.length === 2 &&
      typeof children[1] === 'string'
    ) {
      const text = children[1];
      const Image = renderers.image;
      return <Image src={rest.href} text={text} />;
    }
    return <a {...this.props}>{children}</a>;
  }
};
/* renderers.blockquote = class MDCode extends Component {
  render() {
    const { value } = this.props;
    console.log(this.props);
    return <span>Nicht gefunden: {value}</span>;
  }
}; */
renderers2.code = class MDCode extends Component {
  render() {
    const { value } = this.props;
    console.log(this.props);
    return <span>Nicht gefunden: {value}</span>;
  }
};
renderers2.inlineCode = class MDCode extends Component {
  render() {
    const { value } = this.props;
    if (value === 'literatur') {
      // return <Literatur />;
    }
    return <span>Nicht gefunden: {value}</span>;
  }
};

renderers2.heading = class MDHeading extends Component {
  constructor(props) {
    super(props);
    if (
      props.children &&
      props.children.length === 1 &&
      typeof props.children[0] === 'string'
    ) {
      this.id = createHash(props.children[0] || '');
    }
  }
  render() {
    const { children, level } = this.props;
    return createElement(`h${level}`, {
      id: this.id,
      children,
      ref: ref => (this.ref = ref)
    });
  }
};

let images = [];
renderers2.image = createComponent(
  ({ dur = Math.random(8) + 2 }) => ({
    ifMediumDown: {
      width: '100%',
      height: 'auto',
      marginY: 10,
      onHover: {
        transform: 'scale(1.05)'
      }
    },
    ifMediumUp: {
      position: 'absolute',
      left: 0,
      transform: 'translateX(-120%)',
      onHover: {
        zIndex: 10,
        transform: 'translateX(-120%) scale(1.05)'
      }
    },
    transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
    cursor: 'pointer',
    animationName: {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    },
    animationDuration: `${dur}s`,
    animationTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
  }),
  class Image extends Component {
    state = { open: false };
    constructor(props) {
      super(props);
      const { src } = props;
      this.src = getImg(src);
    }
    componentDidMount() {
      images.push({
        original: this.src,
        thumbnail: this.src
      });
    }
    componentWillUnmount() {
      images = images.filter(x => x.original !== this.src);
    }
    onClick = () => {
      this.lightGallery = node;
    };
    render() {
      const { className } = this.props;
      return (
        <img
          className={className}
          src={this.src}
          onClick={() => this.setState({ open: true })}
        />
      );
    }
  },
  ['src']
);

const Markdown = ({ source }) =>
  astToReact2(source, { renderers: renderers2, definitions: [] });

export const renderers = renderers2;
export const astToReact = astToReact2;
export default Markdown;
