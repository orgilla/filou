import React, { Fragment } from 'react';
import { FaBars } from '@filou/icons';
import Tappable from 'react-tappable';
import { createComponent } from 'react-fela';
import { withState } from 'recompose';
import { Link } from 'react-static';
import { Sticky } from 'react-sticky';
import get from 'lodash/get';
import Nav from '../nav';

export { default as Info } from './info';

const Logo = createComponent(
  ({ theme, sticky }) => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: -10,
    height: 56,
    transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
    textDecoration: 'none',
    ...get(theme, 'filou/static/HeaderLogo', {})
    // transform: sticky.isSticky ? 'scale(0.8) translateX(-26px)' : undefined
  }),
  ({ onClick, to, className, logo: RawLogo, logoText }) => (
    <Link to={to} onClick={onClick} className={className}>
      {typeof RawLogo === 'object' ? RawLogo : <RawLogo />}
      {logoText}
    </Link>
  ),
  p => Object.keys(p)
);

const Menu = createComponent(
  () => ({
    ifSmallDown: {
      display: 'none'
    },
    ifMediumDown: {
      '> *': {
        fontSize: 14
      }
    }
  }),
  ({ children, className }) => <div className={className}>{children}</div>,
  p => Object.keys(p)
);

const Bars = withState('nav', 'setNav', false)(
  createComponent(
    ({ theme }) => ({
      display: 'none',
      ifSmallDown: {
        display: 'initial'
      },
      '& svg': {
        fill: theme.dark1
      }
    }),
    ({ children, className, nav, setNav }) => (
      <Fragment>
        <Nav open={nav} onClose={() => setNav(!nav)}>
          {children}
        </Nav>
        <Tappable className={className} onTap={() => setNav(true)}>
          <FaBars size={30} />
        </Tappable>
      </Fragment>
    ),
    p => Object.keys(p)
  )
);

const Group = createComponent(
  ({ theme }) => ({
    cursor: 'pointer',
    marginRight: 20,
    ':last-child': {
      marginRight: 0
    },
    ':first-child': {
      marginLeft: 0
    },
    textDecoration: 'none',
    position: 'relative',
    '> a': {
      textDecoration: 'none',
      ...get(theme, 'filou/static/HeaderLink', {})
    },
    onHover: {
      color: theme.color,
      '> div': {
        pointerEvents: 'initial',
        opacity: 1
      },
      ...get(theme, 'filou/static/HeaderLink', {})
    },
    '> div': {
      position: 'absolute',
      left: 0,
      top: 10,
      paddingTop: 20,
      zIndex: 13,
      opacity: 0,
      transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
      pointerEvents: 'none',
      width: 220,
      '> div': {
        '> a': {
          color: 'white',
          marginBottom: 4,
          marginTop: 4,
          onHover: {
            color: 'white',
            opacity: 0.7
          }
        },
        paddingX: 20,
        paddingY: 10,
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: '#515450',
        backgroundColor: theme.color,
        borderRadius: 5,
        color: 'white',
        boxShadow:
          'rgba(0, 0, 0, 0.0470588) 0px 1px 4px, rgba(0, 0, 0, 0.0470588) 0px 1px 3px',
        ...get(theme, 'filou/static/HeaderGroup', {})
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

export const Item = createComponent(
  ({ theme }) => ({
    marginRight: 20,
    ':last-child': {
      marginRight: 0
    },
    ':first-child': {
      marginLeft: 0
    },
    textDecoration: 'none',
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    onHover: {
      color: theme.color,
      ...get(theme, 'filou/static/HeaderLink', {})
    },
    ...get(theme, 'filou/static/HeaderLink', {})
  }),
  ({ children, onClick, to, className }) => (
    <Link to={to} onClick={onClick} className={className}>
      {children}
    </Link>
  ),
  p => Object.keys(p)
);

export const Spacer = createComponent(
  () => ({
    flex: 1
  }),
  'div'
);

const Container = createComponent(
  ({ sticky, theme }) => ({
    /* position: 'absolute',
    top: 25,
    left: 0, */
    width: '100%',
    ...sticky.style,
    boxShadow: sticky.isSticky
      ? 'rgba(0, 0, 0, 0.0470588) 0px 1px 4px, rgba(0, 0, 0, 0.0470588) 0px 1px 3px'
      : undefined,
    // paddingY: sticky.isSticky ? 0 : 10,
    // marginBottom: sticky.isSticky ? 20 : 0,
    transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
    paddingX: 10,
    // marginTop: sticky.isSticky ? 0 : 25,
    left: 0,
    backgroundColor: 'white',
    zIndex: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...get(theme, 'filou/static/HeaderContainer', {})
  }),
  'div'
);

const ZIndex = createComponent(
  () => ({
    zIndex: 10,
    '> div': {
      zIndex: 10
    }
  }),
  'div'
);

const createMenu = (Group, Item, menu) => {
  const MenuItem = ({ slug, title, children, hide }) => {
    if (hide) {
      return null;
    }
    return children ? (
      <Group
        title={slug ? <Link to={slug}>{title}</Link> : <Link>{title}</Link>}
      >
        {children.map(item => (
          <MenuItem {...item} key={item.slug || item.title} />
        ))}
      </Group>
    ) : (
      <Item to={slug}>{title}</Item>
    );
  };
  return menu.map(item => <MenuItem {...item} key={item.slug || item.title} />);
};

const Header = ({ logo, sitemap, topOffset, hasInfo, logoText, children }) => (
  <ZIndex>
    <Sticky topOffset={topOffset || (hasInfo === true ? 25 : 0)}>
      {sticky => (
        <Container sticky={sticky}>
          {logo && (
            <Logo to="/" sticky={sticky} logo={logo} logoText={logoText} />
          )}
          {children}
          <Spacer />
          <Menu>{createMenu(Group, Item, sitemap)}</Menu>
          <Bars>{createMenu(Nav.Group, Nav.Item, sitemap)}</Bars>
        </Container>
      )}
    </Sticky>
  </ZIndex>
);

export default Header;
