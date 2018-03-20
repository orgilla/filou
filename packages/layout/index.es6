import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {
  compose,
  withState,
  getContext,
  withProps,
  withPropsOnChange
} from 'recompose';
import { withStyle, withTheme, createComponent } from '@powr/fela';
import { connect } from 'react-redux';
import { FaChevronLeft, FaEllipsisV } from '@filou/icons';
import Tappable from 'react-tappable';
import Swipeable from 'react-swipeable';
import './bouncefix';

export const Icon = createComponent(
  ({ theme }) => ({
    position: 'absolute',
    height: '100%',
    top: 0,
    left: 0,
    width: '100%',
    display: 'none',
    ifSmallDown: {
      display: 'block'
    },
    '> svg': {
      position: 'absolute',
      top: '50%',
      right: 0,
      left: 0,
      padding: 1,
      transform: 'translate(4px, -50%)',
      borderRadius: '100%'
    }
  }),
  ({ className, color, size, icon: Icon, onClick }) => (
    <Tappable className={className} onTap={onClick}>
      <Icon size={size || 18} color={color || 'light'} />
    </Tappable>
  ),
  p => Object.keys(p)
);

export const ContentContainer = createComponent(
  ({ overflowX, overflowY, overflow = 'auto' }) => ({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    overflowX: overflowX || overflow,
    overflowY: overflowY || overflow,
    '-webkit-overflow-scrolling': 'touch'
  }),
  ({ children, className }) => <div className={className}>{children}</div>,
  []
);

export const Navigation = createComponent(
  ({ collapsed, width = 240 }) => ({
    flex: 0,
    flexWidth: 72,
    height: '100%',
    position: 'relative',
    '> div': {
      transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
      zIndex: 5,
      position: 'absolute',
      height: '100%',
      flexWidth: !collapsed ? width : 72
    },
    ifSmallDown: {
      flexWidth: 24,
      overflow: collapsed ? 'hidden' : undefined,
      '> div > div > *': collapsed && {
        display: 'none'
      }
    }
  }),
  ({ children, className, setCollapsed, collapsed }) => (
    <div className={className}>
      <Swipeable
        onSwipedRight={() => setCollapsed(false)}
        onSwipedLeft={() => setCollapsed(true)}
        onMouseMove={() => collapsed && setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        onMouseEnter={() => setCollapsed(false)}
      >
        {children}
        {collapsed && (
          <Icon onClick={() => setCollapsed(false)} icon={FaEllipsisV} />
        )}
      </Swipeable>
    </div>
  ),
  ['setCollapsed', 'collapsed']
);

export const Sidebar = createComponent(
  ({ hasContent, width = 240 }) => ({
    transition: 'all 200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
    width,
    position: 'relative',
    ifSmallDown: {
      flexWidth: hasContent ? 24 : '100%',
      overflow: 'hidden',
      '> div > *': {
        display: hasContent ? 'none' : undefined
      }
    }
  }),
  ({ children, className, goBack, hasContent }) => (
    <Swipeable
      onSwipedRight={() => goBack()}
      className={className}
      onTap={hasContent ? () => goBack() : null}
    >
      {hasContent && (
        <Icon
          setCollapsed={() => goBack()}
          icon={FaChevronLeft}
          size={14}
          color="dark"
        />
      )}
      {children}
    </Swipeable>
  ),
  ['goBack', 'hasContent']
);

export const Section = createComponent(
  ({ placeholder }) => ({
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    ifSmallDown: placeholder && {
      display: 'none'
    }
  }),
  props => <div {...props} />,
  ({ placeholder, ...p }) => Object.keys(p)
);

const enhance = compose(
  withState('absX', 'setAbsX', 0),
  // withState('collapsed', 'setCollapsed', true),
  withStyle({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden'
  }),
  withTheme,
  withState('collapsed', 'setCollapsed', true),
  connect(({ location }) => ({
    url: location.url
  })),
  withPropsOnChange(['url'], ({ collapsed, setCollapsed }) => ({
    xy: !collapsed ? setCollapsed(true) : null
  }))
);

// padding: 0,  `0 constant(safe-area-inset-right) constant(safe-area-inset-bottom) constant(safe-area-inset-left)`, `0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)`]

export default enhance(
  ({
    className,
    setCollapsed,
    collapsed,
    menu,
    children,
    width = 240,
    theme
  }) => (
    <div className={className}>
      <Helmet>
        <style type="text/css">
          {`
            html {
              overflow: hidden; 
              padding: 0;
              margin: 0;
            }
            body {
              overflow: hidden;
              background-color: ${theme.color};
              padding: 0;
              margin: 0;
              -webkit-overflow-scrolling: touch;
            }
            #app {
              display: flex;
              flex-direction: row,
              background-color: white;
              position: relative
            }
          `}
        </style>
      </Helmet>
      <Navigation
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        width={width}
      >
        {cloneElement(menu, { collapsed })}
      </Navigation>
      {children}
    </div>
  )
);

export const Area = ({
  menu,
  children,
  width = 400,
  hasContent = true,
  placeholder = null,
  overflow,
  overflowX,
  overflowY,
  goBack = () => {},
  className
}) => (
  <ContentContainer
    overflow={overflow}
    overflowX={overflowX}
    overflowY={overflowY}
  >
    <Sidebar
      width={width}
      className={className}
      hasContent={hasContent}
      goBack={goBack}
    >
      {menu}
    </Sidebar>
    {hasContent ? (
      <Section>{children}</Section>
    ) : (
      <Section placeholder>{placeholder || children}</Section>
    )}
  </ContentContainer>
);
