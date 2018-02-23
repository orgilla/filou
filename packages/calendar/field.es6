import React from 'react';
import { createComponent } from 'react-fela';

export default createComponent(
  ({ isHeader, isCaption }) => ({
    height: 0,
    overflow: 'hidden',
    margin: !isCaption && !isHeader && '5%',
    width: !isCaption && !isHeader && '90%',
    paddingTop: (isHeader && '50%') || (isCaption && '100%') || '90%',
    position: 'relative',
    '> .content': {
      center: true
    }
  }),
  ({ children, points, ...p }) => (
    <div>
      <div {...p}>
        <div className="content">{children}</div>
      </div>
    </div>
  ),
  ({ isHeader, isCaption, ...p }) => Object.keys(p)
);
