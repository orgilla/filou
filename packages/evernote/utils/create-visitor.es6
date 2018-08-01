const createVisitor = plugins => (first, ...args) => {
  for (const plugin of plugins) {
    first = plugin(first, ...args);
    if (!first) {
      break;
    }
  }

  return first;
};

export default createVisitor;
