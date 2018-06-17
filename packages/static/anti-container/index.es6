import { createComponent } from 'react-fela';

const AntiContainer = createComponent(
  () => ({
    ifMediumUp: {
      marginX: -200
    },
    ifLargeUp: {
      marginX: -300
    }
  }),
  'div',
  ({ minHeight, ...p }) => Object.keys(p)
);

export default AntiContainer;
