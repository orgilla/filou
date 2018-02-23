import React from 'react';
import { createComponent, withTheme } from 'react-fela';
import { SwatchesPicker } from 'react-color';
import { getColor } from '@filou/ui/colors-provider';

const Edit = createComponent(
  ({ theme, compact = true }) => ({
    '> .ant-input': {
      padding: 'initial',
      width: 'calc(100% - 5px) !important',
      '> div': {
        display: 'initial !important',
        '> div': {
          '&:first-child': {
            display: 'none',
          },
          '> div': {
            overflowY: 'auto !important',
            padding: theme.space2,
            '> div': {
              display: 'flex',
              flexWrap: !!compact && 'wrap',
              justifyContent: 'space-around',
              padding: '0 !important',
              '> div': {
                padding: `${theme.space0} !important`,
                margin: `${theme.space1} !important`,
                width: '20% !important',
                '> span > div': {
                  width: '100% !important',
                  '> div': {
                    position: 'relative',
                    margin: '0 !important',
                    '> svg': {
                      centerX: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }),
  withTheme(
    ({ theme, value = [], onChange, className, compact = true, ...props }) => {
      const [col = 0, pal = props.palette || theme.palette] = value;
      const getColorIndex = hex => {
        let palette;
        const color = theme.colors.findIndex(c => {
          const i = c.findIndex(p => p.toLowerCase() === hex.toLowerCase());
          if (i !== -1) {
            palette = i;
            return true;
          }
          return false;
        });

        if (color !== -1) {
          return [color, palette];
        }
        return [];
      };
      const colors = !compact ? theme.colors : theme.colors.map(c => [c[pal]]);

      return (
        <div className={className}>
          <SwatchesPicker
            className="ant-input"
            color={getColor(theme, col, pal)}
            colors={colors}
            onChange={({ hex }) => onChange(getColorIndex(hex))}
            height="auto"
            {...props}
          />
        </div>
      );
    }
  ),
  p => Object.keys(p)
);
Edit.displayName = 'EditThemecolor';
Edit.type = 'array';
export default Edit;
