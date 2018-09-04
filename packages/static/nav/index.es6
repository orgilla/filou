import React from 'react';
import Drawer from '@filou/portal/drawer';
import { createComponent } from 'react-static';
import get from 'lodash/get';
import LinkConsumer from '../link';

const StyledDrawer = createComponent(
  () => ({
    boxShadow: '-1px 0 28px 0 rgba(0, 0, 0, .15)',
    padding: 20,
    paddingBottom: 0,
    zIndex: 15,
    // backgroundColor: 'white',
    maxWidth: '80%!important'
  }),
  p => <Drawer {...p} />,
  p => Object.keys(p)
);
const Container = createComponent(
  () => ({
    flex: 1,
    flexDirection: 'column'
  }),
  p => <div {...p} />,
  p => Object.keys(p)
);
const Group = createComponent(
  ({ theme }) => ({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    padding: 10,
    paddingBottom: 0,
    color: theme.color,
    fontSize: 22,
    lineHeight: '20px',
    position: 'relative',
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    '> a': {
      textDecoration: 'none'
    },
    '> div': {
      zIndex: 13,
      transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
      width: 200,
      '> div': {
        padding: 0,
        paddingBottom: 10,
        paddingX: 10,
        display: 'flex',
        flexDirection: 'column',
        '> a': {
          padding: 0,
          paddingTop: 5,
          fontSize: 18
        }
      }
    }
  }),
  ({ children, className, title }) => (
    <span className={className}>
      {title}
      <div>
        <div>{children}</div>
      </div>
    </span>
  ),
  p => Object.keys(p)
);
const Item = createComponent(
  ({ theme, active, depth = 1 }) => ({
    // flex: 1,
    cursor: 'pointer',
    display: 'flex',
    textDecoration: 'none',
    paddingTop: 10,
    paddingLeft: depth * 10,
    paddingRight: 10,
    paddingBottom: 0,
    color: theme.color,
    fontSize: 22,
    lineHeight: '20px',
    position: 'relative',
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    transform: active ? 'scale(1.05)' : undefined,
    '> a': {
      textDecoration: 'none',
      ...get(theme, 'filou/static/NavItemLink', {})
    },
    onBefore: active && {
      zIndex: 100,
      content: '"■"',
      position: 'absolute',
      marginRight: 10,
      fontWeight: 'bold',
      color: theme.color,
      left: '-0.5em'
    }
  }),
  p => <LinkConsumer>{Link => <Link {...p} />}</LinkConsumer>,
  p => Object.keys(p)
);

const Nav = ({ open, onClose, children }) => (
  <StyledDrawer open={open} onClose={onClose} right fixed>
    <Container>{children}</Container>
  </StyledDrawer>
);

Nav.Item = Item;
Nav.Group = Group;
export default Nav;
