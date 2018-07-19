export default (src, params = '') =>
  src ||
  `https://res.cloudinary.com/x23/image/fetch/${params ||
    'c_fill,f_auto,q_auto:eco,fl_lossy,g_auto'}/${src}`;
