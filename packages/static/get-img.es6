export default (src, params = '') => {
  if (src.indexOf('http') !== 0 && src.indexOf('//') !== 0 && process.env.URL) {
    src = `${process.env.URL}${src}`;
  } else if (src.indexOf('http') !== 0 && src.indexOf('//') !== 0) {
    return src;
  }
  return `https://res.cloudinary.com/x23/image/fetch/${params ||
    'c_fill,f_auto,q_auto:eco,fl_lossy,g_auto'}/${src}`;
};
