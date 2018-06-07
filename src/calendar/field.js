import React from 'react';
import { createComponent } from 'react-fela';

const Placeholder = createComponent(
  () => ({
    position: 'absolute',
    top: -3,
    left: 1,
    fontSize: '12px',
    whiteSpace: 'nowrap'
  }),
  'span'
);

export default createComponent(
  ({ isHeader, isCaption, isOdd }) => ({
    backgroundColor: isOdd ? '#0000000a' : undefined,
    position: 'relative',
    '> div': {
      height: 0,
      // overflow: 'hidden',
      margin: !isCaption && !isHeader && '5%',
      width: !isCaption && !isHeader && '90%',
      paddingTop: (isHeader && '50%') || (isCaption && '100%') || '90%',
      position: 'relative',
      '> .content': {
        center: true
      }
    }
  }),
  ({ children, points, placeholder, ...p }) => (
    <div {...p}>
      {placeholder ? <Placeholder>{placeholder}</Placeholder> : null}
      <div>
        <div className="content">{children}</div>
      </div>
    </div>
  ),
  ({ isHeader, isCaption, isOdd, ...p }) => Object.keys(p)
);
