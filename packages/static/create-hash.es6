export default (str = '') =>
  str
    .toLowerCase()
    .split(' ')
    .join('-');
