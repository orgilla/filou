export * from './markdown';

export const getText = node => {
  if (node.type === 'text' && node.value) {
    return node.value;
  } else if (node.children) {
    return node.children
      .map(getText)
      .filter(x => x)
      .join('');
  }
};

export const getImage = node => {
  if (node.type === 'image') {
    return node.url;
  } else if (node.children) {
    return node.children
      .map(getImage)
      .filter(x => x)
      .join('');
  }
};

export const extractNode = (ast, type, all = false) => {
  const jackpot = [];
  const recurse = node => {
    const children = [];
    if (!node.children || !node) {
      return node;
    }
    for (let i = 0; i < node.children.length; i++) {
      const currentNode = node.children[i];
      if (currentNode.type === type && all) {
        jackpot.push(currentNode);
      } else if (currentNode.type === type && jackpot.length === 0) {
        jackpot.push(currentNode);
      } else if (jackpot.length && !all) {
        children.push(currentNode);
      } else {
        children.push(recurse(currentNode));
      }
    }
    const newNode = { ...node, children };
    return newNode;
  };
  return { restOfAst: recurse(ast), firstNode: jackpot[0], nodes: jackpot };
};

export const extractFirst = (type, as, rip = true) => (mdast, frontmatter) => {
  const { firstNode, restOfAst } = extractNode(mdast, type);
  if (type === 'image') {
    const value = getImage(firstNode);
    if (value) {
      frontmatter[as] = value;
    }
  } else {
    const value = getText(firstNode);
    if (value) {
      frontmatter[as] = value;
    }
  }
  return rip ? restOfAst : mdast;
};
