import React from 'react';
import { ThemeProvider, withTheme } from 'react-fela';
import Nav from '../nav';
import MobileBars from './mobile-bars';
import Container from './container';
import createMenuItems from './create-menu-items';
import Spacer from './spacer';
import Logo from './logo';
import Group from './group';
import Mega from './mega';
import Item from './item';

const HeaderGroup = ({ mega, ...props }) =>
  mega ? <Mega {...props} /> : <Group {...props} />;

const Header = ({
  theme,
  sticky,
  height,
  inverted = theme.inverted,
  backgroundColor,
  subMenuInverted = inverted,
  mobileNavInverted = inverted,
  fontSize = theme.fontSize,
  fontStyle = theme.fontStyle,
  fontWeight = theme.fontWeight,
  color = theme.color,
  container = false,
  className,
  logo,
  children,
  logoText,
  sitemap
}) => (
  <ThemeProvider
    theme={{
      inverted,
      fontSize: theme[fontSize] || fontSize || theme.fontSize,
      fontStyle: theme[fontStyle] || fontStyle || theme.fontStyle,
      fontWeight: theme[fontWeight] || fontWeight || theme.fontWeight,
      linkColor: theme[color] || color || theme.color
    }}
  >
    <Container
      backgroundColor={backgroundColor}
      sticky={sticky}
      top={0}
      container={container}
      className={className}
      height={height}
    >
      {logo && <Logo to="/" sticky={sticky} logo={logo} logoText={logoText} />}
      {sitemap && <Spacer />}
      {sitemap && (
        <MobileBars inverted={mobileNavInverted}>
          {createMenuItems(Nav.Group, Nav.Item, sitemap)}
        </MobileBars>
      )}
      {sitemap && (
        <Container nested>
          {createMenuItems(HeaderGroup, Item, sitemap, {
            inverted: subMenuInverted,
            height
          })}
        </Container>
      )}
      {children}
    </Container>
  </ThemeProvider>
);

export default withTheme(Header);
