import React from 'react';
import styled from '../styled';
const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1120 624v496q0 14-9 23t-23 9h-160q-14 0-23-9t-9-23v-496q0-112-80-192t-192-80h-272v1152q0 14-9 23t-23 9h-160q-14 0-23-9t-9-23v-1344q0-14 9-23t23-9h464q135 0 249 66.5t180.5 180.5 66.5 249zm384-464v880q0 135-66.5 249t-180.5 180.5-249 66.5h-464q-14 0-23-9t-9-23v-960q0-14 9-23t23-9h160q14 0 23 9t9 23v768h272q112 0 192-80t80-192v-880q0-14 9-23t23-9h160q14 0 23 9t9 23z"/></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaIls';
export default styled(icon);