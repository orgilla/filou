import { createComponent } from 'react-fela';

export default createComponent(
  ({ theme }) => ({
    display: 'flex',
    flexFlow: 'row wrap',
    fontSize: '90%',
    marginTop: theme.space1,
    minWidth: 200,
    '> *': {
      width: `${100 / 7}%`,
      textAlign: 'center'
    }
  }),
  'div',
  p => Object.keys(p)
);
