import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1745 297q10 10 10 23t-10 23l-141 141q-28 28-68 28h-1344q-26 0-45-19t-19-45v-256q0-26 19-45t45-19h576v-64q0-26 19-45t45-19h128q26 0 45 19t19 45v64h512q40 0 68 28zm-977 919h256v512q0 26-19 45t-45 19h-128q-26 0-45-19t-19-45v-512zm832-448q26 0 45 19t19 45v256q0 26-19 45t-45 19h-1344q-40 0-68-28l-141-141q-10-10-10-23t10-23l141-141q28-28 68-28h512v-192h256v192h576z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaMapSigns';
export default styled(icon);