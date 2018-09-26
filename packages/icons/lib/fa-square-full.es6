import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 32v448H32V32h448m32-32H0v512h512V0z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaSquareFull';
export default styled(icon);