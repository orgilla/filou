import { createComponent } from 'react-fela';

const Container = createComponent(
  ({ sticky, theme, height }) => ({
    /* position: 'absolute',
    top: 25,
    left: 0, */
    height,
    position: 'relative',
    width: '100%',
    ...sticky.style,
    boxShadow:
      sticky.isSticky && sticky.distanceFromTop !== 0
        ? theme.boxShadow
        : undefined,
    // paddingY: sticky.isSticky ? 0 : 10,
    // marginBottom: sticky.isSticky ? 20 : 0,
    transition: theme.transition,
    paddingX: 10,
    // marginTop: sticky.isSticky ? 0 : 25,
    left: 0,
    backgroundColor: !theme.inverted ? theme.light : theme.color,
    zIndex: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }),
  'div'
);

export default Container;
