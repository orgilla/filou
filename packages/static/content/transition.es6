import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Transition = createComponent(
  ({ theme, timeout }) => ({
    '&.fade-enter': {
      opacity: 0,
      transition: theme.transition,
      transitionDuration: `${timeout.enter}ms`
    },
    '&.fade-enter.fade-enter-active': {
      opacity: 0
    },
    '&.fade-exit': {
      opacity: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transition: theme.transition,
      transitionDuration: `${timeout.exit}ms`
    },
    '&.fade-exit.fade-exit-active': {
      opacity: 0
    },
    '&.slide-enter.slide-enter-active': {
      zIndex: 10,
      animationName: {
        '0%': {
          transform: 'translateX(100%)'
        },
        '100%': {
          transform: 'translateX(0)'
        }
      },
      animationDuration: `${timeout.enter}ms`,
      animationTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
    },
    '&.slide-exit.slide-exit-active': {
      zIndex: 9,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      animationName: {
        '0%': {
          opacity: 1
          // transform: 'translateX(0)'
        },
        '100%': {
          opacity: 0
          // transform: 'translateX(-100%)'
        }
      },
      animationDuration: `${timeout.exit}ms`,
      animationTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
    }
  }),
  props => <CSSTransition {...props} />,
  p => Object.keys(p)
);

export default () => (
  <RouteData>
    {({ history }) => (
      <TransitionGroup component="main" style={{ position: 'relative' }}>
        <Transition
          key={history.location.key}
          timeout={{ enter: 10000, exit: 10000 }}
          classNames="fade"
          enter
          exit
        >
          <Content>{children}</Content>
        </Transition>
      </TransitionGroup>
    )}
  </RouteData>
);
