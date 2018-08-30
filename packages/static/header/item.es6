import React from 'react';
import { createComponent } from 'react-fela';
import get from 'lodash/get';
import HistoryConsumer from '../history';
import LinkConsumer from '../link';

const func = () => ({});
const Item = createComponent(
  ({
    theme,
    flex,
    nolink,
    active,
    hideIfSmall,
    hideIfMini,
    hideIfMedium,
    color
  }) => ({
    fontSize: theme.fontSize,
    cursor: 'pointer',
    fontStyle: theme.fontStyle,
    fontWeight: theme.fontWeight,
    color:
      color === true
        ? theme.color
        : color
          ? theme[color]
          : theme.inverted
            ? theme.light
            : theme.linkColor,
    textDecoration: 'none',
    transition: theme.transition,
    position: 'relative',
    extend: [
      {
        condition: !nolink,
        style: {
          overflow: 'hidden'
        }
      },
      {
        condition: hideIfMini,
        style: {
          ifMini: {
            display: 'none'
          }
        }
      },
      {
        condition: hideIfMedium,
        style: {
          ifMediumDown: {
            display: 'none'
          }
        }
      },
      {
        condition: hideIfSmall,
        style: {
          ifSmallDown: {
            display: 'none'
          }
        }
      },
      {
        condition: active,
        style: theme.activeStyle || {
          ...get(theme, 'linkAnimation.active', func)(theme)
        }
      }
    ],
    minWidth: 0,
    // whiteSpace: 'nowrap',
    // textOverflow: 'ellipsis',
    height: '100%',
    display: flex !== false ? 'flex' : undefined,
    alignItems: 'center',
    onHover: !nolink && {
      textDecoration: 'none',
      color: theme.inverted ? theme.light : theme.linkColor,
      opacity: 0.6,
      ...get(theme, 'linkAnimation.hover', func)(theme)
    },
    ...get(theme, 'linkAnimation.default', func)(theme)
  }),
  ({ children, onClick, to, className, nolink }) =>
    to ? (
      <LinkConsumer>
        {Link => (
          <Link to={to} onClick={onClick} className={className}>
            {children}
          </Link>
        )}
      </LinkConsumer>
    ) : (
      <span className={className} onClick={onClick}>{children}</span>
    ),
  p => Object.keys(p)
);

const ActiveItem = ({ to, exact, ...rest }) =>
  to ? (
    <HistoryConsumer>
      {History => (
        <History to={to} exact={exact} {...rest}>
          {({ pathname }) => (
            <Item to={to} active={pathname === to} {...rest} />
          )}
        </History>
      )}
    </HistoryConsumer>
  ) : (
    <Item {...rest} />
  );

export default ActiveItem;
