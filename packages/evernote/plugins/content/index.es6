export const unwrapText = node => {
  if (node.tagName === 'span' && node.children.length === 1) {
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
    node.props.type.indexOf('image/') === 0 &&
    note.resourceMap &&
    note.resourceMap[node.props.hash]
  ) {
    const { hash } = node.props;
    node.tagName = 'img';
    node.props = {
      value: note.resourceMap[hash].url || `/${note.resourceMap[hash].filename}`
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
export const fields = node => {
  const { style } = node.props;
  if (
    node.tagName === 'span' &&
    style &&
    style.indexOf('evernote-highlight') !== -1
  ) {
    node.tagName = 'field';
    node.props.value = node.children[0].content;
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
  if (node.tagName === 'br' && children.length === 0) {
    return null;
  }
  return node;
};
export const headings = (node, index, parent, children, context, note) => {
  const { style } = node.props;

  if (!context.headings) {
    context.headings = [];
  }
  if (node.tagName === 'span' && style && style.indexOf('24px') !== -1) {
    const size = parseInt(
      ((style.split('font-size:')[1] || '').split('px')[0] || '').trim(),
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
  if (
    node.tagName === 'div' &&
    node.children.find(x => x.tagName === 'table')
  ) {
    node = node.children.find(x => x.tagName === 'table');
  }
  return node;
};
export const center = (node, index, parent) => {
  if (node.tagName === 'div' && node.children.length === 1) {
    if (
      node.props.style &&
      node.props.style.indexOf('center') !== -1 &&
      parent
    ) {
      parent.props.center = true;
    }
    node = node.children[0];
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
      const value1 = row.children[0].children[0].content;
      const value2 = row.children[1].children[0].content;
      context[value1] = value2;
    });
    return null;
  }
  return node;
};
export const removeStyle = node => {
  if (node && node.props && node.props.style) {
    delete node.props.style;
  }
  return node;
};
