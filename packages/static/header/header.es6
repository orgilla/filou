import React from 'react';
import { Sticky } from 'react-sticky';
import { ThemeProvider, createComponent, withTheme } from 'react-fela';
import Nav from '../nav';
import MobileBars from './mobile-bars';
import Container from './container';
import createMenuItems from './create-menu-items';
import Spacer from './spacer';
import Logo from './logo';
import Group from './group';
import Item from './item';

const StickyBox = createComponent(
  ({ height }) => ({
    height,
    zIndex: 12,
    '> div': {
      height,
      zIndex: 12
    }
  }),
  'div'
);

const Inner = ({
  height,
  sticky,
  logo,
  children,
  logoText,
  subMenuInverted,
  mobileNavInverted,
  sitemap,
  container,
  className
}) => (
  <Container
    container={container}
    className={className}
    height={height}
    sticky={sticky}
  >
    {logo && <Logo to="/" sticky={sticky} logo={logo} logoText={logoText} />}
    {children}
    {sitemap && <Spacer />}
    {sitemap && (
      <MobileBars inverted={mobileNavInverted}>
        {createMenuItems(Nav.Group, Nav.Item, sitemap)}
      </MobileBars>
    )}
    {sitemap && (
      <Container nested>
        {createMenuItems(Group, Item, sitemap, {
          inverted: subMenuInverted
        })}
      </Container>
    )}
  </Container>
);
const Header = ({
  theme,
  sticky,
  offsetTop,
  height,
  inverted = theme.inverted,
  subMenuInverted = inverted,
  mobileNavInverted = inverted,
  fontSize = theme.fontSize,
  fontWeight = theme.fontWeight,
  color = theme.color,
  container = false,
  ...rest
}) => (
  <ThemeProvider
    theme={{
      inverted,
      fontSize: theme[fontSize] || fontSize || theme.fontSize,
      fontWeight: theme[fontWeight] || fontWeight || theme.fontWeight,
      linkColor: theme[color] || color || theme.color
    }}
  >
    {sticky ? (
      <StickyBox height={height}>
        <Sticky topOffset={offsetTop}>
          {stickyProps => (
            <div>
              <Inner
                {...rest}
                container={container}
                height={height}
                sticky={stickyProps}
                subMenuInverted={subMenuInverted}
                mobileNavInverted={mobileNavInverted}
              />
            </div>
          )}
        </Sticky>
      </StickyBox>
    ) : (
      <Inner
        {...rest}
        container={container}
        height={height}
        subMenuInverted={subMenuInverted}
      />
    )}
  </ThemeProvider>
);

export default withTheme(Header);
