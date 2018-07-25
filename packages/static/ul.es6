import { createComponent } from 'react-fela';

const List = createComponent(
  ({ theme }) => ({
    position: 'relative',
    marginBottom: 0,
    marginLeft: '0.4rem',
    listStyleType: 'none',
    '> li': {
      '> a ': {
        whiteSpace: 'initial'
      },
      '> ul': {
        marginTop: 3
      },
      paddingLeft: '0.5em',
      marginBottom: 3,
      position: 'relative'
    },
    '> li:before': {
      content: '"■"',
      fontSize: 8,
      transform: 'translateX(-50%) translateY(-50%)',
      position: 'absolute',
      marginRight: 10,
      fontWeight: 'bold',
      color: theme.color,
      top: 13,
      left: 0
    }
  }),
  'ul'
);

export default List;
