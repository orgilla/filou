import { createComponent } from 'react-fela';

export const getStyle = ({ theme }) => ({
  marginBottom: 0,
  marginLeft: 0,
  listStyleType: 'none',
  '> li': {
    position: 'relative',
    // display: 'inline-block',
    paddingLeft: theme.space3,
    '> ul': {
      marginTop: 3
    },
    '> a': {
      // display: 'inline-block'
    }
  },
  '> li:before': {
    content: '"■"',
    float: 'left',
    fontSize: '50%',
    // display: 'inline-block',
    transform: `translateY(50%) translateX(-${theme.space3})`,
    // transform: `translateY(-75%) translateX(-${theme.space3})`,
    width: 0,
    color: theme.color
  }
});
const List = createComponent(getStyle, 'ul');

export default List;
