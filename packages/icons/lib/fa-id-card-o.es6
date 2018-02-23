import React from 'react';
import styled from '../styled';

const icon = ({ color, width, height, size, ...rest }) => (
  <svg fill={color} width={size || width} height={size || height} {...rest}  viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 1212q0 55-31.5 93.5t-75.5 38.5h-426q-44 0-75.5-38.5t-31.5-93.5q0-54 7.5-100.5t24.5-90 51-68.5 81-25q64 64 156 64t156-64q47 0 81 25t51 68.5 24.5 90 7.5 100.5zm-128-444q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 416v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704q14 0 23 9t9 23zm-384-256v64q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h320q14 0 23 9t9 23zm384 0v64q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h192q14 0 23 9t9 23zm0-256v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704q14 0 23 9t9 23zm128 832v-1120h-1792v1120q0 13 9.5 22.5t22.5 9.5h1728q13 0 22.5-9.5t9.5-22.5zm128-1216v1216q0 66-47 113t-113 47h-1728q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z" /></svg>
);
icon.defaultProps = { width: 100, height: 100 };
icon.displayName = 'FaIdCardO';
export default styled(icon);