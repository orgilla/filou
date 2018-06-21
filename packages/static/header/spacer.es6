import React from 'react-fela';
import { createComponent } from 'react-fela';

const Spacer = createComponent(
  ({ hideIfSmall }) => ({
    flex: 1,
    extend: [
      {
        condition: hideIfSmall,
        style: {
          ifSmallDown: {
            display: 'none'
          }
        }
      }
    ]
  }),
  'div'
);

const HideIfSmall = createComponent(
  () => ({
    flex: 1
  }),
  () => <Spacer />
);

Spacer.HideIfSmall = HideIfSmall;

export default Spacer;
