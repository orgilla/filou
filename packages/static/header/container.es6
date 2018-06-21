import { createComponent } from 'react-fela';

const Container = createComponent(
  ({ sticky = {}, theme, height, nested }) => ({
    ifSmallDown: nested && {
      display: 'none'
    },
    '> *': {
      marginRight: theme.space3,
      ':last-child': {
        marginRight: 0
      },
      ':first-child': {
        marginLeft: 0
      }
    },
    height: height || (nested ? '100%' : undefined),
    position: 'relative',
    width: nested ? undefined : '100%',
    ...sticky.style,
    boxShadow:
      sticky.isSticky && sticky.distanceFromTop !== 0
        ? theme.boxShadow
        : undefined,
    // paddingY: sticky.isSticky ? 0 : 10,
    // marginBottom: sticky.isSticky ? 20 : 0,
    transition: theme.transition,
    paddingX: nested ? undefined : theme.space2,
    // marginTop: sticky.isSticky ? 0 : 25,
    left: 0,
    backgroundColor: nested
      ? undefined
      : !theme.inverted
        ? theme.light
        : theme.color,
    zIndex: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }),
  'div'
);

export default Container;
