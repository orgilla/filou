import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 832v128q0 201-98.5 362t-274 251.5-395.5 90.5-395.5-90.5-274-251.5-98.5-362v-128q0-26 19-45t45-19h384q26 0 45 19t19 45v128q0 52 23.5 90t53.5 57 71 30 64 13 44 2 44-2 64-13 71-30 53.5-57 23.5-90v-128q0-26 19-45t45-19h384q26 0 45 19t19 45zm-1024-640v384q0 26-19 45t-45 19h-384q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h384q26 0 45 19t19 45zm1024 0v384q0 26-19 45t-45 19h-384q-26 0-45-19t-19-45v-384q0-26 19-45t45-19h384q26 0 45 19t19 45z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaMagnet';
export default styled(icon);