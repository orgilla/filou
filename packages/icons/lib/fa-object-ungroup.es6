import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} width="2304" viewBox="0 0 2304 1792" xmlns="http://www.w3.org/2000/svg"><path d="M2304 768h-128v640h128v384h-384v-128h-896v128h-384v-384h128v-128h-384v128h-384v-384h128v-640h-128v-384h384v128h896v-128h384v384h-128v128h384v-128h384v384zm-256-256v128h128v-128h-128zm-640-384v128h128v-128h-128zm-1280 0v128h128v-128h-128zm128 1152v-128h-128v128h128zm1280-128h-128v128h128v-128zm-1152 0h896v-128h128v-640h-128v-128h-896v128h-128v640h128v128zm512 512v-128h-128v128h128zm1280 0v-128h-128v128h128zm-128-256v-640h-128v-128h-384v384h128v384h-384v-128h-384v128h128v128h896v-128h128z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaObjectUngroup';
export default styled(icon);