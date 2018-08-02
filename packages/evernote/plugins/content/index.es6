const { get } = require('lodash');

const getNodeByTag = (node, tagName) => {
  if (node.tagName === tagName) {
    return node;
  }
  if (node.children) {
    return node.children.find(x => getNodeByTag(x, tagName));
  }
};

const getContent = node => {
  if (node.content) {
    return node.content;
  }
  if (node.children) {
    return node.children
      .map(getContent)
      .filter(x => x)
      .join('\n');
  }
};

const hasStyle = (node, style) => {
  if (node.style && node.style.indexOf(style) !== -1) {
    return true;
  }

  return false;
};

const isType = (node, ...args) => args.indexOf(node.tagName) !== -1;

export const unwrapText = node => {
  if (node.tagName === 'span' && node.children.length === 1) {
    node = node.children[0];
  }
  if (node.tagName === 'div' && node.children.length === 1) {
    node = node.children[0];
  }
  return node;
};
export const removeFont = node => {
  if (node.tagName === 'font') {
    return node.children[0];
  }
  return node;
};
export const run = func => (node, index, parent, children, context, note) => {
  if (func) {
    return func(node, index, parent, children, context, note);
  }
  return node;
};
export const mediaToImage = (node, index, parent, children, context, note) => {
  if (
    node.tagName === 'en-media' &&
    node.props.type &&
    node.props.type.indexOf('image/') === 0
  ) {
    const { hash } = node.props;
    node.tagName = 'img';
    node.props = {
      value:
        get(note, `resourceMap.${hash}.url`) ||
        `/${get(note, `resourceMap.${hash}.filename`)}`
    };
  }

  return node;
};
export const unwrapMedia = node => {
  if (
    node.tagName === 'div' &&
    node.children &&
    node.children.length === 2 &&
    node.children[0].tagName === 'en-media' &&
    node.children[1].tagName === 'br'
  ) {
    node = node.children[0];
  }

  return node;
};
export const fields = (node, index, parent) => {
  if (isType(node, 'span', 'font') && hasStyle(node, 'evernote-highlight')) {
    node.tagName = 'field';
    node.props.value = getContent(node);

    if (node.props.value && node.props.value.indexOf(' ') !== -1) {
      const [type, ...value] = node.props.value.split(' ');
      node.tagName = type;
      node.props.value = value.length === 1 ? value[0] : value;
    }
    node.children = [];
  }

  return node;
};
export const removeBreaks = (node, index, parent, children) => {
  if (node.tagName === 'br' && children.length === 0 && !parent.tagName) {
    return null;
  }
  if (node.tagName === 'br' && parent.children.length - 1 === index) {
    return null;
  }
  return node;
};
export const headings = (node, index, parent, children, context, note) => {
  if (!context.headings) {
    context.headings = [];
  }
  if (isType(node, 'span', 'font') && hasStyle(node, 'font-size') !== -1) {
    const size = parseInt(
      ((node.style.split('font-size:')[1] || '').split('px')[0] || '').trim(),
      10
    );

    if (size >= 48) {
      context.headings.push({ depth: 1, value: node.children[0].content });
      return { ...node, tagName: 'h1' };
    } else if (size >= 36) {
      context.headings.push({ depth: 2, value: node.children[0].content });
      return { ...node, tagName: 'h2' };
    } else if (size >= 24) {
      context.headings.push({ depth: 3, value: node.children[0].content });
      return { ...node, tagName: 'h3' };
    } else if (size >= 18) {
      context.headings.push({ depth: 4, value: node.children[0].content });
      return { ...node, tagName: 'h4' };
    }
  }

  return node;
};
export const internalLinks = node => {
  if (
    node.tagName === 'a' &&
    node.props.href &&
    node.props.href.indexOf('evernote://') === 0
  ) {
    const split = node.props.href.split('/');
    node.props.href = `evernote://${split[split.length - 2]}`;
  }

  return node;
};
export const unwrapTable = node => {
  if (node.tagName === 'div' && !node.style) {
    return node.children;
  }
  return node;
};
export const center = (node, index, parent) => {
  if (node.style && node.style.indexOf('center') !== -1 && parent) {
    parent.props.center = true;
  }
  if (isType(node, 'span') && hasStyle(node, 'bold')) {
    node.props.bold = true;
  }
  return node;
};
export const extractTableAtStart = (node, index, parent, children, context) => {
  if (
    children.length === 0 &&
    node.tagName === 'table' &&
    node.children[0].children.length === 2
  ) {
    node.children[1].children.forEach(row => {
      const value1 = getContent(row.children[0]);
      const value2 = getContent(row.children[1]);
      context[value1] = value2;
    });
    return null;
  }
  return node;
};
export const removeStyle = node => {
  if (node && node.style) {
    delete node.style;
  }
  return node;
};
