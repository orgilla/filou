import { createComponent } from 'react-fela';
import { border } from '@filou/ui/utils';

export default createComponent(
  ({ theme, marginBottom }) => ({
    width: '100%',
    border: 'none',
    borderTop: border(theme, theme.dark4),
    marginBottom,
  }),
  'hr'
);
