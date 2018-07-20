import { createComponent } from 'react-fela';
import get from 'lodash/get';

const Content = createComponent(({ theme }) => ({
  flex: 1,
  minHeight: 'calc(85vh)',
  marginBottom: 100,
  '& p': {
    textAlign: 'justify',
    hyphens: 'auto'
  },
  '& ul': {
    listStyleType: 'none',
    '> li': {
      paddingLeft: '1em',
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
      top: '50%',
      left: 0
    }
  },
  ...get(theme, 'filou/static/Content', {})
}));

export default Content;
