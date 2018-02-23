import { compose, withPropsOnChange } from 'recompose';
import { withTheme } from 'react-fela';
import { getColor } from '@filou/core/colors-provider';

const enhance = compose(
  withTheme,
  withPropsOnChange(
    ['theme', 'inverted', 'color'],
    ({ theme, inverted, color = '#F4F5F7', palette }) => ({
      theme: {
        // inverted: inverted === undefined ? color === true : inverted,
        inverted: inverted !== undefined ? inverted : theme.inverted,
      },
      color: getColor(theme, color, palette),
    })
  )
);
export default enhance;
