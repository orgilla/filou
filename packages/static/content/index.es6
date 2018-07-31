import { createComponent } from 'react-fela';
import get from 'lodash/get';
import { getStyle } from '../ul';

const Content = createComponent(({ theme }) => ({
  flex: 1,
  minHeight: 'calc(85vh)',
  marginBottom: 100,
  '& p': {
    textAlign: 'justify',
    hyphens: 'auto'
  },
  '& ul': getStyle({ theme }),
  ...get(theme, 'filou/static/Content', {})
}));

export default Content;
