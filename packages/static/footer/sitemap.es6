import React from 'react';
import { createComponent, ThemeProvider, withTheme } from 'react-fela';
import Item from '../header/item';

const MenuItem = ({ slug, title, children, singlePage }) => {
  const inner = <Item to={slug}>{title}</Item>;
  const childs =
    children && !singlePage ? (
      <ul>
        {children.map(item => (
          <MenuItem {...item} key={item.slug || item.title} />
        ))}
      </ul>
    ) : null;
  return (
    <li>
      {inner}
      {childs}
    </li>
  );
};

const Sitemap = createComponent(
  ({ theme }) => ({
    '& ul': {
      '& a': {
        onAfter: {
          left: 0,
          maxWidth: '33%',
          transform: 'translateX(0)'
        }
      },
      position: 'relative',
      marginBottom: 0,
      marginLeft: '0.4rem',
      listStyleType: 'none',
      '> li': {
        '> ul': {
          marginTop: 3
        },
        paddingLeft: '0.5em',
        marginBottom: 3,
        position: 'relative'
      },
      '> li:before': {
        content: '"■"',
        color: theme.color,
        position: 'absolute',
        marginRight: 10,
        fontWeight: 'bold',
        left: '-0.5em'
      }
    }
  }),
  ({
    sitemap,
    className,
    theme,
    inverted = theme.inverted,
    fontSize = theme.fontSize,
    fontWeight = theme.fontWeight,
    color = theme.dark
  }) => (
    <ThemeProvider
      theme={{
        inverted,
        fontSize: theme[fontSize] || fontSize || theme.fontSize,
        fontWeight: theme[fontWeight] || fontWeight || theme.fontWeight,
        linkColor: theme[color] || color || theme.color
      }}
    >
      <panel className={className}>
        <ul>
          {sitemap.map(item => (
            <MenuItem {...item} key={item.slug || item.title} />
          ))}
        </ul>
      </panel>
    </ThemeProvider>
  ),
  p => Object.keys(p)
);

export default withTheme(Sitemap);
