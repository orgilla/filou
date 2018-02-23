import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1174 1020q0 64-38 109t-91 45q-43 0-70-15v-277q28-17 70-17 53 0 91 45.5t38 109.5zm-343-428q0 64-38 109.5t-91 45.5q-43 0-70-15v-277q28-17 70-17 53 0 91 45t38 109zm562 431q0-134-88-229t-213-95q-20 0-39 3-23 78-78 136-87 95-211 101v636l211-41v-206q51 19 117 19 125 0 213-95t88-229zm-343-427q0-134-88.5-229t-213.5-95q-74 0-141 36h-186v840l211-41v-206q55 19 116 19 125 0 213.5-95t88.5-229zm614-180v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaPiedPiperPp';
export default styled(icon);