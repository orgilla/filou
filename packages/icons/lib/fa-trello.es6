import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M832 1344v-1024q0-14-9-23t-23-9h-480q-14 0-23 9t-9 23v1024q0 14 9 23t23 9h480q14 0 23-9t9-23zm672-384v-640q0-14-9-23t-23-9h-480q-14 0-23 9t-9 23v640q0 14 9 23t23 9h480q14 0 23-9t9-23zm160-768v1408q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h1408q26 0 45 19t19 45z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaTrello';
export default styled(icon);