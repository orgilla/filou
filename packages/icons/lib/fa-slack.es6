import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1583 776q62 0 103.5 40.5t41.5 101.5q0 97-93 130l-172 59 56 167q7 21 7 47 0 59-42 102t-101 43q-47 0-85.5-27t-53.5-72l-55-165-310 106 55 164q8 24 8 47 0 59-42 102t-102 43q-47 0-85-27t-53-72l-55-163-153 53q-29 9-50 9-61 0-101.5-40t-40.5-101q0-47 27.5-85t71.5-53l156-53-105-313-156 54q-26 8-48 8-60 0-101-40.5t-41-100.5q0-47 27.5-85t71.5-53l157-53-53-159q-8-24-8-47 0-60 42-102.5t102-42.5q47 0 85 27t53 72l54 160 310-105-54-160q-8-24-8-47 0-59 42.5-102t101.5-43q47 0 85.5 27.5t53.5 71.5l53 161 162-55q21-6 43-6 60 0 102.5 39.5t42.5 98.5q0 45-30 81.5t-74 51.5l-157 54 105 316 164-56q24-8 46-8zm-794 262l310-105-105-315-310 107z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaSlack';
export default styled(icon);