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
      position: 'absolute',
      marginRight: 10,
      fontWeight: 'bold',
      color: theme.color,
      left: '-0.5em'
    }
  },
  ...get(theme, 'filou/static/Content', {})
}));

export default Content;
