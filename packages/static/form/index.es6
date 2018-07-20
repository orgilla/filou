import { createComponent } from 'react-fela';

const Form = createComponent(
  () => ({
    '> h5': {
      marginBottom: 5,
      marginTop: 10
    },
    '> input': {
      boxShadow: '0 1px 0 #ebebec',
      borderColor: '1px solid #d0d0d0',
      borderRadius: 3,
      width: '100%',
      border: '1px solid lightgray',
      marginBottom: 5
    },
    '> textarea': {
      boxShadow: '0 1px 0 #ebebec',
      borderColor: '1px solid #d0d0d0',
      borderRadius: 3,
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
      borderRadius: 3
    }
  }),
  'form',
  p => Object.keys(p)
);

export default Form;
