import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M441 672q33 0 52 26 266 364 362 774h-446q-127-441-367-749-12-16-3-33.5t29-17.5h373zm559 357q-49 199-125 393-79-310-256-594 40-221 44-449 211 340 337 650zm99-709q235 324 384.5 698.5t184.5 773.5h-451q-41-665-553-1472h435zm693 576q0 424-101 812-67-560-359-1083-25-301-106-584-4-16 5.5-28.5t25.5-12.5h359q21 0 38.5 13t22.5 33q115 409 115 850z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaGoogleWallet';
export default styled(icon);