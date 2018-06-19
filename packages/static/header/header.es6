import React from 'react';
import { Sticky } from 'react-sticky';
import { ThemeProvider, createComponent, withTheme } from 'react-fela';
import Nav from '../nav';
import Menu from './menu';
import MobileBars from './mobile-bars';
import Container from './container';
import createMenuItems from './create-menu-items';
import Spacer from './spacer';
import Logo from './logo';
import Group from './group';
import Item from './item';

const ZIndex = createComponent(
  () => ({
    zIndex: 10,
    '> div': {
      zIndex: 10
    }
  }),
  'div'
);

const Header = ({
  logo,
  sitemap,
  offsetTop,
  logoText,
  children,
  height,
  theme,
  inverted = theme.inverted,
  subMenuInverted = inverted,
  fontSize = theme.fontSize,
  fontWeight = theme.fontWeight,
  linkColor = theme.color
}) => (
  <ThemeProvider
    theme={{
      inverted,
      fontSize: theme[fontSize] || fontSize || theme.fontSize,
      fontWeight: theme[fontWeight] || fontWeight || theme.fontWeight,
      linkColor: theme[linkColor] || linkColor || theme.color
    }}
  >
    <ZIndex>
      <Sticky topOffset={offsetTop}>
        {sticky => (
          <Container height={height} sticky={sticky}>
            {logo && (
              <Logo to="/" sticky={sticky} logo={logo} logoText={logoText} />
            )}
            {children}
            <Spacer />
            <Menu>
              {createMenuItems(Group, Item, sitemap, {
                inverted: subMenuInverted
              })}
            </Menu>
            <MobileBars>
              {createMenuItems(Nav.Group, Nav.Item, sitemap)}
            </MobileBars>
          </Container>
        )}
      </Sticky>
    </ZIndex>
  </ThemeProvider>
);

export default withTheme(Header);
