import { createComponent } from 'react-fela';

const Form = createComponent(
  ({ theme }) => ({
    '& h5': {
      marginBottom: 5,
      marginTop: 10
    },
    '& label': {
      fontSize: '0.87055rem',
      color: 'rgb(85,85,85)'
    },
    '& fieldset': {
      borderColor: '1px solid #d0d0d0',
      boxShadow: '0 1px 0 #ebebec',
      border: '1px solid lightgray',
      borderRadius: theme.borderRadius,
      padding: theme.space1,
      '> legend': {
        fontSize: '0.87055rem',
        color: 'rgb(85,85,85)'
      },
      '> label': {
        marginRight: theme.space1
      }
    },
    '> div > input': {
      boxShadow: '0 1px 0 #ebebec',
      borderColor: '1px solid #d0d0d0',
      borderRadius: theme.borderRadius,
      width: '100%',
      border: '1px solid lightgray',
      fontSize: '0.87055rem',
      color: 'rgb(85,85,85)',
      marginBottom: 5
    },
    '> div > textarea': {
      boxShadow: '0 1px 0 #ebebec',
      borderColor: '1px solid #d0d0d0',
      borderRadius: theme.borderRadius,
      width: '100%',
      border: '1px solid lightgray',
      marginBottom: 5
    },
    '> button': {
      background: '#FFF',
      paddingX: 20,
      color: '#59636d',
      fontSize: 11,
      lineHeight: '18px',
      fontWeight: 'bold',
      boxShadow: '0 1px 0 #ebebec',
      borderColor: '1px solid #d0d0d0',
      borderRadius: theme.borderRadius
    },
    '> button:disabled': {
      opacity: 0.5
    }
  }),
  'form',
  p => Object.keys(p)
);

export default Form;
