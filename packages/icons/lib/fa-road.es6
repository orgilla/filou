import React from 'react';
import styled from '../styled';

const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest}  viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1175 996v-4l-24-320q-1-13-11-22.5t-23-9.5h-186q-13 0-23 9.5t-11 22.5l-24 320v4q-1 12 8 20t21 8h244q12 0 21-8t8-20zm759 467q0 73-46 73h-704q13 0 22-9.5t8-22.5l-20-256q-1-13-11-22.5t-23-9.5h-272q-13 0-23 9.5t-11 22.5l-20 256q-1 13 8 22.5t22 9.5h-704q-46 0-46-73 0-54 26-116l417-1044q8-19 26-33t38-14h339q-13 0-23 9.5t-11 22.5l-15 192q-1 14 8 23t22 9h166q13 0 22-9t8-23l-15-192q-1-13-11-22.5t-23-9.5h339q20 0 38 14t26 33l417 1044q26 62 26 116z" /></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaRoad';
export default styled(icon);