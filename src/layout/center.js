import { createComponent } from 'react-fela';

const Center = createComponent(
  ({ theme, size = 30 }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
    '> *': {
      flex: 1
    }
  }),
  'div'
);
export default Center;
