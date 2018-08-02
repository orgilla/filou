const traverse = (visitor, ...args) => {
  const internal = node => {
    const children = [];
    if (!node || !node.children) {
      return node;
    }
    for (let i = 0; i < node.children.length; i++) {
      const currentNode = node.children[i];
      const edited = visitor(currentNode, i, node, children, ...args);
      if (edited && Array.isArray(edited)) {
        edited.forEach(x => children.push(internal(x)));
      } else if (edited) {
        children.push(internal(edited));
      }
    }
    const newNode = { ...node, children };
    return newNode;
  };
  return internal;
};

export default traverse;
