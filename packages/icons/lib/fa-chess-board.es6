import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 0v512h512V0H0zm480 480H32V32h448v448zm-352-32H64v-64h64v64zm64-64h64v64h-64v-64zm128 0h64v64h-64v-64zm-128 0h-64v-64h64v64zm128-64v64h-64v-64h64zm64 64v-64h64v64h-64zM128 256v64H64v-64h64zm128 64h-64v-64h64v64zm64-64h64v64h-64v-64zm-128 0h-64v-64h64v64zm64 0v-64h64v64h-64zm128 0v-64h64v64h-64zM128 128v64H64v-64h64zm64 64v-64h64v64h-64zm128 0v-64h64v64h-64zm-128-64h-64V64h64v64zm128 0h-64V64h64v64zm128 0h-64V64h64v64z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaChessBoard';
export default styled(icon);