import React from 'react';
import { createComponent } from 'react-fela';
import tinycolor from 'tinycolor2';
import { getColor } from '@filou/core/colors-provider';
import Field from './field';

export default createComponent(
  ({
    theme,
    disabled,
    active,
    today,
    pointColor,
    color,
    backgroundColor,
    bold,
    palette
  }) => ({
    '> div': {
      color:
        (!!active && theme.light) ||
        (disabled && theme.dark4) ||
        (color && getColor(theme, color, palette)),
      backgroundColor:
        (backgroundColor && getColor(theme, backgroundColor, palette)) ||
        (!!active && theme.color) ||
        (!!today && theme.dark4),
      fontWeight: bold ? 'bold' : undefined,
      // borderRadius: '50%',
      cursor: 'pointer',
      '> .content': {
        '> .points': {
          centerX: true,
          top: 10,
          color:
            (!!active && theme.light2) ||
            (pointColor && getColor(theme, pointColor, palette)) ||
            (disabled && theme.dark5) ||
            theme.dark2,
          fontSize: '90%'
        }
      },
      onHover: {
        backgroundColor:
          (!!active &&
            tinycolor(theme.color)
              .setAlpha(0.8)
              .toString()) ||
          theme.dark4
      }
    }
  }),
  ({ children, points, color, ...p }) => (
    <Field {...p}>
      {children}
      {!!points && (
        <div className="points">
          {Array.from(Array(points)).map((x, y) => (
            <span key={y}>&bull;</span>
          ))}
        </div>
      )}
    </Field>
  ),
  ({ active, today, bold, ...p }) => Object.keys(p)
);
